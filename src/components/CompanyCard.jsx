import { Building2, MapPin, Briefcase, ExternalLink } from "lucide-react";

export default function CompanyCard({ company }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Building2 className="w-8 h-8 text-blue-600 mr-3" />
          <h3 className="text-xl font-semibold text-gray-800">
            {company.name}
          </h3>
        </div>

        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{company.location}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Briefcase className="w-4 h-4 mr-2" />
          <span className="text-sm">{company.industry}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed">
        {company.description}
      </p>
    </div>
  );
}
