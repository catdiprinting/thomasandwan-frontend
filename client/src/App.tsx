import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Cases from "@/pages/Cases";
import MedicalMalpractice from "@/pages/MedicalMalpractice";
import BirthInjuries from "@/pages/BirthInjuries";
import ComplicationsOfChildbirth from "@/pages/ComplicationsOfChildbirth";
import FAQ from "@/pages/FAQ";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/cases-we-handle" component={Cases} />
      <Route path="/cases-we-handle/medical-malpractice" component={MedicalMalpractice} />
      <Route path="/cases-we-handle/birth-injuries" component={BirthInjuries} />
      <Route path="/cases-we-handle/complications-of-childbirth" component={ComplicationsOfChildbirth} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
