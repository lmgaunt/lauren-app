import { Users, TrendingUp, AlertCircle, Activity, Plus, Search, Filter, Flame, ChevronRight, FileText, MessageSquare, Settings } from 'lucide-react';
import { Patient } from '@/app/types';

interface ClinicianHomeViewProps {
  patients: Patient[];
  setSelectedPatient: (patient: Patient) => void;
  setView: (view: string) => void;
}

export const ClinicianHomeView = ({ patients, setSelectedPatient, setView }: ClinicianHomeViewProps) => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 pt-20 px-6 pb-20">
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Dr. Sarah Chen, PT • 5 active patients</p>
        </div>
        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">5</p>
              <p className="text-sm text-gray-600">Active Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">81%</p>
              <p className="text-sm text-gray-600">Avg Compliance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">2</p>
              <p className="text-sm text-gray-600">Need Attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">23</p>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Patient List</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
              <Filter className="w-5 h-5 text-gray-600" />
              Filter
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {patients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => {
                setSelectedPatient(patient);
                setView('patient-detail');
              }}
              className="w-full bg-gray-50 hover:bg-blue-50 rounded-xl p-4 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {patient.name}
                    </h4>
                    <div className="flex items-center gap-4">
                      {patient.alerts > 0 && (
                        <span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                          <AlertCircle className="w-4 h-4" />
                          {patient.alerts} alert{patient.alerts > 1 ? 's' : ''}
                        </span>
                      )}
                      <span className={`text-2xl font-bold ${
                        patient.compliance >= 80 ? 'text-green-600' :
                        patient.compliance >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {patient.compliance}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Age {patient.age}</span>
                    <span>•</span>
                    <span>{patient.therapyType}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      {patient.streak} day streak
                    </span>
                    <span>•</span>
                    <span>Last active: {patient.lastActivity}</span>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => setView('billing')}
          className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-left group"
        >
          <FileText className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-semibold text-gray-800 mb-1">Billing &amp; Documentation</h4>
          <p className="text-sm text-gray-600">Generate reports for insurance</p>
        </button>
        <button className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-left group">
          <MessageSquare className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
          <h4 className="font-semibold text-gray-800 mb-1">Messages</h4>
          <p className="text-sm text-gray-600">3 unread messages</p>
        </button>
        <button className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-left group">
          <Settings className="w-8 h-8 text-blue-600 mb-3 group-hover:rotate-90 transition-transform" />
          <h4 className="font-semibold text-gray-800 mb-1">Settings</h4>
          <p className="text-sm text-gray-600">Manage account &amp; preferences</p>
        </button>
      </div>
    </div>
  </div>
);
