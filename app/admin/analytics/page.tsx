"use client"

import type React from "react"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ArrowUpRight, Users, Globe, Clock, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  // Sample data for charts
  const visitorData = [
    { name: "Week 1", visitors: 1200, pageViews: 3800 },
    { name: "Week 2", visitors: 1400, pageViews: 4200 },
    { name: "Week 3", visitors: 1300, pageViews: 4000 },
    { name: "Week 4", visitors: 1500, pageViews: 4500 },
    { name: "Week 5", visitors: 1700, pageViews: 5100 },
    { name: "Week 6", visitors: 1600, pageViews: 4800 },
    { name: "Week 7", visitors: 1800, pageViews: 5400 },
    { name: "Week 8", visitors: 2000, pageViews: 6000 },
  ]

  const deviceData = [
    { name: "Desktop", value: 45 },
    { name: "Mobile", value: 40 },
    { name: "Tablet", value: 15 },
  ]

  const sourceData = [
    { name: "Direct", value: 30 },
    { name: "Organic Search", value: 40 },
    { name: "Social Media", value: 15 },
    { name: "Referral", value: 10 },
    { name: "Email", value: 5 },
  ]

  const conversionData = [
    { name: "Homepage", views: 5000, inquiries: 250, conversion: 5 },
    { name: "Tours", views: 3500, inquiries: 210, conversion: 6 },
    { name: "Destinations", views: 2800, inquiries: 140, conversion: 5 },
    { name: "Blog", views: 2000, inquiries: 80, conversion: 4 },
    { name: "About", views: 1500, inquiries: 45, conversion: 3 },
    { name: "Contact", views: 1200, inquiries: 90, conversion: 7.5 },
  ]

  const COLORS = ["#FFE600", "#E50000", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <AdminLayout title="Analytics Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Website Performance</h2>
          <div className="w-48">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Visitors"
            value="12,543"
            change="+12.5%"
            icon={<Users className="h-5 w-5" />}
            description="vs. previous period"
          />
          <StatCard
            title="Page Views"
            value="38,215"
            change="+8.2%"
            icon={<Globe className="h-5 w-5" />}
            description="vs. previous period"
          />
          <StatCard
            title="Avg. Session Duration"
            value="3m 24s"
            change="+2.1%"
            icon={<Clock className="h-5 w-5" />}
            description="vs. previous period"
          />
          <StatCard
            title="Conversion Rate"
            value="5.8%"
            change="+1.3%"
            icon={<TrendingUp className="h-5 w-5" />}
            description="vs. previous period"
          />
        </div>

        {/* Charts */}
        <Tabs defaultValue="traffic">
          <TabsList className="mb-4">
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
          </TabsList>

          <TabsContent value="traffic">
            <Card>
              <CardHeader>
                <CardTitle>Website Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visitorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="visitors"
                        stroke="#FFE600"
                        activeDot={{ r: 8 }}
                        name="Visitors"
                      />
                      <Line yAxisId="right" type="monotone" dataKey="pageViews" stroke="#E50000" name="Page Views" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversions">
            <Card>
              <CardHeader>
                <CardTitle>Page Conversion Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="conversion" fill="#FFE600" name="Conversion Rate (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Homepage</p>
                    <p className="text-sm text-gray-500">/</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">5,240 views</p>
                    <p className="text-sm text-gray-500">Avg. time: 2m 15s</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Kerala Backwaters Tour</p>
                    <p className="text-sm text-gray-500">/tours/kerala-backwaters</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">3,120 views</p>
                    <p className="text-sm text-gray-500">Avg. time: 3m 45s</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Rajasthan Heritage Tour</p>
                    <p className="text-sm text-gray-500">/tours/rajasthan-heritage</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">2,845 views</p>
                    <p className="text-sm text-gray-500">Avg. time: 4m 10s</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">About Us</p>
                    <p className="text-sm text-gray-500">/about</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">2,210 views</p>
                    <p className="text-sm text-gray-500">Avg. time: 1m 55s</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Contact Page</p>
                    <p className="text-sm text-gray-500">/contact</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">1,980 views</p>
                    <p className="text-sm text-gray-500">Avg. time: 1m 30s</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visitor Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Age Groups</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-24 text-sm">18-24</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                      <span className="w-12 text-right text-sm">15%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">25-34</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                      <span className="w-12 text-right text-sm">32%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">35-44</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                      </div>
                      <span className="w-12 text-right text-sm">28%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">45-54</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "18%" }}></div>
                      </div>
                      <span className="w-12 text-right text-sm">18%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">55+</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "7%" }}></div>
                      </div>
                      <span className="w-12 text-right text-sm">7%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Top Countries</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-24 text-sm">India</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="w-12 text-right text-sm">45%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">USA</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <span className="w-12 text-right text-sm">20%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">UK</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                      </div>
                      <span className="w-12 text-right text-sm">12%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">Australia</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                      <span className="w-12 text-right text-sm">8%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm">Germany</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "6%" }}></div>
                      </div>
                      <span className="w-12 text-right text-sm">6%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  description: string
}

function StatCard({ title, value, change, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold">{value}</p>
          <div className="flex items-center text-sm">
            <span className="text-green-600 flex items-center mr-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              {change}
            </span>
            <span className="text-gray-500">{description}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
