import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import About from "@/pages/About";
import PracticeAreasPage from "@/pages/PracticeAreas";
import TestimonialsPage from "@/pages/Testimonials";
import BlogPage from "@/pages/Blog";
import ContactPage from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} /> 
      <Route path="/practice-areas" component={PracticeAreasPage} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route path="/success" component={TestimonialsPage} /> {/* Keeping success route for backward compatibility if needed */}
      <Route path="/blog" component={BlogPage} />
      <Route path="/contact" component={ContactPage} />
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
