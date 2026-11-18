import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import LaptopCard from '../components/LaptopCard';
import LaptopModal from '../components/LaptopModal';
import laptops from '../data/laptops';

const priceFilters = [
  { value: 'all', label: 'Any price', max: Infinity },
  { value: '30000', label: 'Up to ₱30,000', max: 30000 },
  { value: '50000', label: 'Up to ₱50,000', max: 50000 },
  { value: '75000', label: 'Up to ₱75,000', max: 75000 },
  { value: '150000', label: 'Up to ₱150,000', max: 150000 },
];

const sortOptions = [
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
  { value: 'weight', label: 'Lightest first' },
];

export default function Catalog() {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('all');
  const [os, setOs] = useState('all');
  const [price, setPrice] = useState('all');
  const [sort, setSort] = useState('price-asc');
  const [selectedLaptop, setSelectedLaptop] = useState(null);

  const brands = useMemo(() => [...new Set(laptops.map((laptop) => laptop.brand))].sort(), []);

  const visibleLaptops = useMemo(() => {
    const text = query.trim().toLowerCase();
    const maxPrice = priceFilters.find((p) => p.value === price).max;

    const filtered = laptops.filter((laptop) => {
      const searchable = `${laptop.name} ${laptop.brand} ${laptop.cpu} ${laptop.gpu} ${laptop.bestFor.join(' ')}`.toLowerCase();
      return (
        (text === '' || searchable.includes(text)) &&
        (brand === 'all' || laptop.brand === brand) &&
        (os === 'all' || laptop.os === os) &&
        laptop.price <= maxPrice
      );
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'weight') return a.weight - b.weight;
      return a.price - b.price;
    });
  }, [query, brand, os, price, sort]);

  const clearFilters = () => {
    setQuery('');
    setBrand('all');
    setOs('all');
    setPrice('all');
    setSort('price-asc');
  };

  return (
    <>
      <HeroBanner
        compact
        eyebrow="🔎 Catalog"
        title="Browse every laptop"
        subtitle="Search and filter our full list. Not sure which one to pick? Let SpecMate narrow it down for you."
      >
        <Link to="/find" className="btn btn-primary">
          Get recommendations
        </Link>
      </HeroBanner>

      <section className="section-pad pt-3" aria-label="Laptop catalog">
        <div className="container">
          <form className="sm-card filter-bar mb-4" onSubmit={(event) => event.preventDefault()} role="search">
            <div className="row g-3 align-items-end">
              <div className="col-12 col-lg-4">
                <label htmlFor="catalog-search" className="form-label">
                  Search
                </label>
                <input
                  id="catalog-search"
                  type="search"
                  className="form-control"
                  placeholder="Try “MacBook”, “RTX”, or “coding”"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <div className="col-6 col-lg-2">
                <label htmlFor="catalog-brand" className="form-label">
                  Brand
                </label>
                <select
                  id="catalog-brand"
                  className="form-select"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                >
                  <option value="all">All brands</option>
                  {brands.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6 col-lg-2">
                <label htmlFor="catalog-os" className="form-label">
                  Operating system
                </label>
                <select
                  id="catalog-os"
                  className="form-select"
                  value={os}
                  onChange={(event) => setOs(event.target.value)}
                >
                  <option value="all">Any</option>
                  <option value="windows">Windows</option>
                  <option value="mac">macOS</option>
                </select>
              </div>
              <div className="col-6 col-lg-2">
                <label htmlFor="catalog-price" className="form-label">
                  Price
                </label>
                <select
                  id="catalog-price"
                  className="form-select"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                >
                  {priceFilters.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6 col-lg-2">
                <label htmlFor="catalog-sort" className="form-label">
                  Sort by
                </label>
                <select
                  id="catalog-sort"
                  className="form-select"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>

          <p className="text-secondary mb-3" role="status" aria-live="polite">
            Showing {visibleLaptops.length} of {laptops.length} laptops
          </p>

          {visibleLaptops.length === 0 ? (
            <div className="sm-card text-center p-5">
              <h2 className="h5 fw-bold">No laptops match your search</h2>
              <p className="text-secondary">Try removing a filter or searching for something else.</p>
              <button type="button" className="btn btn-primary" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {visibleLaptops.map((laptop) => (
                <div className="col-12 col-md-6 col-xl-4" key={laptop.id}>
                  <LaptopCard laptop={laptop} onDetails={setSelectedLaptop} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedLaptop && <LaptopModal laptop={selectedLaptop} onClose={() => setSelectedLaptop(null)} />}
    </>
  );
}
