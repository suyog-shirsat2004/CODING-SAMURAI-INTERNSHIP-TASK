import { useState, useEffect, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { fetchProducts, fetchCategories } from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load products. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const getFilteredProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }

    return filtered;
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger d-inline-block">{error}</div>
        <br />
        <button className="btn btn-primary mt-3" onClick={loadData}>Retry</button>
      </div>
    );
  }

  const filteredProducts = getFilteredProducts();

  return (
    <div>
      <h1 className="fs-1 text-center mb-4">All Products</h1>

      <div className="d-flex flex-wrap gap-3 mb-4 p-3 bg-white rounded-3 shadow-sm">
        <div className="flex-fill" style={{minWidth: '200px'}}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-center gap-2">
          <label className="fw-medium text-nowrap">Category:</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="d-flex align-items-center gap-2">
          <label className="fw-medium text-nowrap">Sort By:</label>
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <p className="text-muted mb-3">{filteredProducts.length} products found</p>

      <div className="row g-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-12 col-sm-6 col-lg-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-muted py-5 fs-5">No products found matching your criteria.</p>
      )}
    </div>
  );
};

export default Products;

