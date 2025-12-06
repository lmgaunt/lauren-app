import { Download } from 'lucide-react';
import { Patient } from '@/app/types';

interface ClinicianBillingViewProps {
  patients: Patient[];
  setView: (view: string) => void;
}

export const ClinicianBillingView = ({ patients, setView }: ClinicianBillingViewProps) => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-6 pb-20">
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => setView('home')}
        className="text-blue-600 font-semibold mb-4 flex items-center gap-1"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Billing &amp; Documentation</h1>
      <p className="text-gray-600 mb-6">Generate compliance reports and session documentation for insurance billing</p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Report</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
              <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                {patients.map(p => (
                  <option key={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none" />
                <input type="date" className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none">
                <option>Compliance Summary</option>
                <option>Session Documentation</option>
                <option>Progress Report</option>
                <option>Full Billing Report</option>
              </select>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Generate &amp; Download Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Total Billable Sessions (This Month)</p>
              <p className="text-3xl font-bold text-blue-600">47</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Average Compliance Rate</p>
              <p className="text-3xl font-bold text-green-600">81%</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Remote Monitoring Hours</p>
              <p className="text-3xl font-bold text-purple-600">23.5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Documentation</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-semibold text-gray-800">Compliance Report - Alex Martinez</h4>
              <p className="text-sm text-gray-600">Generated Oct 25, 2024 • 14-day period</p>
            </div>
            <button className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-semibold text-gray-800">Session Notes - Emma Johnson</h4>
              <p className="text-sm text-gray-600">Generated Oct 23, 2024 • 30-day period</p>
            </div>
            <button className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-semibold text-gray-800">Progress Report - Noah Brown</h4>
              <p className="text-sm text-gray-600">Generated Oct 20, 2024 • 90-day period</p>
            </div>
            <button className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
