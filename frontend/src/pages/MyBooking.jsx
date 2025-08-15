import React, { useState } from "react";
import {
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Phone,
  Mail,
  Download,
  Eye,
  Filter,
  Search,
  User,
} from "lucide-react";
import useMyBookings from "../hooks/useMyBooking";

const MyBooking = () => {
  const { bookings, loading, error } = useMyBookings();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-100",
          label: "Confirmed",
        };
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          label: "Pending",
        };
      case "cancelled":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-100",
          label: "Cancelled",
        };
      default:
        return {
          icon: Clock,
          color: "text-gray-600",
          bgColor: "bg-gray-100",
          label: "Unknown",
        };
    }
  };

  // Filter bookings
  const filteredBookings =
    bookings?.filter((booking) => {
      const matchesSearch =
        booking.tourTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        booking.status?.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    }) || [];

  const LoadingState = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">📅</div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        No bookings found
      </h3>
      <p className="text-gray-600 mb-6">
        {searchTerm || statusFilter !== "all"
          ? "Try adjusting your search or filters"
          : "You haven't made any bookings yet. Start exploring our tours!"}
      </p>
      {(searchTerm || statusFilter !== "all") && (
        <button
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  const ErrorState = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
              Your Travel History
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bookings
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track and manage all your travel bookings in one place
          </p>
        </div>

        {/* Search and Filter Section */}
        {bookings && bookings.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search bookings by tour name or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-600" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {filteredBookings.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {bookings.length}
                </span>{" "}
                bookings
              </p>
            </div>
          </div>
        )}

        {/* Bookings Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
          {!bookings || bookings.length === 0 ? (
            <EmptyState />
          ) : filteredBookings.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredBookings.map((booking, index) => {
                const statusInfo = getStatusInfo(booking.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={booking._id}
                    className="p-6 hover:bg-gray-50/50 transition-colors duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      {/* Left Section - Tour Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                              {booking.tourTitle}
                            </h3>
                            <div className="flex items-center space-x-1 text-gray-500 text-sm">
                              <span>Booking ID:</span>
                              <span className="font-mono font-semibold text-blue-600">
                                #{booking._id.slice(-8).toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div
                            className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusInfo.bgColor}`}
                          >
                            <StatusIcon
                              size={16}
                              className={statusInfo.color}
                            />
                            <span
                              className={`text-sm font-semibold ${statusInfo.color}`}
                            >
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>

                        {/* Customer & Booking Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <User size={16} className="text-gray-400" />
                            <div>
                              <div className="text-gray-500">Customer</div>
                              <div className="font-semibold text-gray-800">
                                {booking.name}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Users size={16} className="text-gray-400" />
                            <div>
                              <div className="text-gray-500">Travelers</div>
                              <div className="font-semibold text-gray-800">
                                {booking.travelers} people
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <CreditCard size={16} className="text-gray-400" />
                            <div>
                              <div className="text-gray-500">Total Price</div>
                              <div className="font-bold text-green-600">
                                ₹{booking.totalPrice?.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-gray-400" />
                            <div>
                              <div className="text-gray-500">Booked On</div>
                              <div className="font-semibold text-gray-800">
                                {new Date(booking.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mt-4 flex flex-wrap items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail size={14} />
                            <span>{booking.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone size={14} />
                            <span>{booking.phone}</span>
                          </div>
                        </div>

                        {/* Special Requests */}
                        {booking.specialRequests && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <div className="text-sm">
                              <span className="font-semibold text-blue-800">
                                Special Requests:{" "}
                              </span>
                              <span className="text-blue-700">
                                {booking.specialRequests}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Section - Actions */}
                      <div className="flex flex-col space-y-2 lg:ml-6">
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                          <Eye size={16} />
                          <span>View Details</span>
                        </button>

                        <button className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                          <Download size={16} />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Summary Card */}
        {bookings && bookings.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">{bookings.length}</div>
                <div className="text-blue-100">Total Bookings</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </div>
                <div className="text-blue-100">Confirmed</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  ₹
                  {bookings
                    .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
                    .toLocaleString()}
                </div>
                <div className="text-blue-100">Total Spent</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
