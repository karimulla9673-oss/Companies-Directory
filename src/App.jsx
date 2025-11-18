import React, { useState, useEffect, useMemo } from 'react';
import Filters from './components/Filters';
import CompanyCard from './components/CompanyCard';
import Loader from './components/Loader';
import ErrorState from './components/ErrorState';
import NoResults from './components/NoResults';
import Pagination from './components/Pagination';
import { Building2 } from 'lucide-react';

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/companies.json');
        if (!response.ok) throw new Error('Failed to fetch companies');
        const data = await response.json();
        setCompanies(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const locations = useMemo(() => {
    return [...new Set(companies.map(c => c.location))].sort();
  }, [companies]);

  const industries = useMemo(() => {
    return [...new Set(companies.map(c => c.industry))].sort();
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    let filtered = companies.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !selectedLocation || company.location === selectedLocation;
      const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
      return matchesSearch && matchesLocation && matchesIndustry;
    });

    if (selectedSort === 'asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === 'desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  }, [companies, searchTerm, selectedLocation, selectedIndustry, selectedSort]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, selectedIndustry, selectedSort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <Building2 className="w-10 h-10 mr-3" />
            <h1 className="text-3xl font-bold">Companies Directory</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          locations={locations}
          industries={industries}
        />

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorState message={error} />
        ) : filteredCompanies.length === 0 ? (
          <NoResults />
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCompanies.length)} of {filteredCompanies.length} companies
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 202 Companies Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}