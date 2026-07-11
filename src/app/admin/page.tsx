
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { StoryGeneratorTool } from "@/components/StoryGeneratorTool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, FileEdit, Plus, History, Settings, Mail, DollarSign } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [donations, setDonations] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Sign in anonymously to pass Firestore rules
      signInAnonymously(auth).catch(console.error);

      const dQuery = query(collection(db, "donations"), orderBy("timestamp", "desc"));
      const eQuery = query(collection(db, "enquiries"), orderBy("timestamp", "desc"));

      const unsubD = onSnapshot(dQuery, (snapshot) => {
        setDonations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      const unsubE = onSnapshot(eQuery, (snapshot) => {
        setEnquiries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => {
        unsubD();
        unsubE();
      };
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="font-headline">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input type="text" placeholder="Username" className="w-full border p-2 rounded" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full border p-2 rounded" onChange={(e) => setPassword(e.target.value)} />
            <Button className="w-full" onClick={() => {
              if (username === 'superadmin' && password === 'PGAS@8928') {
                setIsAuthenticated(true);
              } else {
                alert('Invalid credentials');
              }
            }}>Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 flex-1">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Impact Command Center</h1>
            <p className="text-muted-foreground">Manage organizational growth and community stories.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-primary/90 transition-all">
              <Plus className="w-4 h-4" /> New Project
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Active Programs", value: "8", icon: BarChart, color: "text-blue-500" },
            { label: "Draft Stories", value: "12", icon: FileEdit, color: "text-amber-500" },
            { label: "Recent Updates", value: "45", icon: History, color: "text-emerald-500" },
            { label: "System Status", value: "Optimal", icon: Settings, color: "text-primary" },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color} opacity-20`} />
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="bg-muted p-1 rounded-full w-full max-w-md mx-auto mb-12">
            <TabsTrigger value="generator" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:text-primary">
              AI Story Generator
            </TabsTrigger>
            <TabsTrigger value="cms" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:text-primary">
              CMS Dashboard
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:text-primary">
              Donations/Enquiries
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generator" className="animate-in fade-in zoom-in-95 duration-500">
            <StoryGeneratorTool />
          </TabsContent>
          
          <TabsContent value="cms">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-all">
                  <div className="h-40 bg-muted relative">
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold">PUBLISHED</div>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg line-clamp-1">Harvesting Hope in Gadag</CardTitle>
                    <p className="text-xs text-muted-foreground">Updated 2 days ago • Program: Agriculture</p>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex gap-2">
                    <button className="text-xs font-bold text-primary">Edit</button>
                    <button className="text-xs font-bold text-muted-foreground">Archive</button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Donation Intents
                  </CardTitle>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">{donations.length}</span>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {donations.length === 0 ? (
                      <p className="text-sm text-zinc-500 italic">No donation intents recorded yet.</p>
                    ) : (
                      donations.map((d) => (
                        <div key={d.id} className="p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 space-y-1">
                          <p className="font-bold text-zinc-900">{d.name}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                            <span>{d.phone}</span>
                            {d.email && <span>{d.email}</span>}
                            <span>{mounted ? new Date(d.timestamp).toLocaleString() : ""}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    Enquiries
                  </CardTitle>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">{enquiries.length}</span>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {enquiries.length === 0 ? (
                      <p className="text-sm text-zinc-500 italic">No enquiries received yet.</p>
                    ) : (
                      enquiries.map((e) => (
                        <div key={e.id} className="p-4 rounded-xl border border-zinc-100 bg-white shadow-sm space-y-2">
                          <div className="flex justify-between items-start">
                            <p className="font-bold text-zinc-900">{e.name}</p>
                            <span className="text-[10px] text-zinc-400">{mounted ? new Date(e.timestamp).toLocaleDateString() : ""}</span>
                          </div>
                          <p className="text-sm text-zinc-700 leading-relaxed">{e.message}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 pt-2 border-t border-zinc-50">
                            <span>{e.phone}</span>
                            <span>{e.email}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
