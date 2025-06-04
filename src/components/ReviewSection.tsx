import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, Plus, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    rating: 5,
    comment: "",
  });

  // Fetch reviews from backend API on mount
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Directly map backend fields to frontend state
          const parsedReviews = data.map((r) => ({
            id: r.id.toString(),
            name: r.name,
            role: r.role,
            rating: r.rating,
            comment: r.comment,
            date: r.timestamp.split("T")[0],
          }));
          setReviews(parsedReviews);
        }
      })
      .catch(() => {
        setReviews([]);
      });
  }, []);

  // Submit new review to backend API
  const handleSubmitReview = async () => {
  const { name, role, rating, comment } = newReview;

  if (!name.trim() || !role.trim() || !comment.trim()) {
    toast({
      title: "Error",
      description: "Please fill in all fields.",
      variant: "destructive",
    });
    return;
  }

  const payload = { name, role, rating, comment };

  console.log("Submitting review:", payload);

  try {
    const response = await fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed response:", errorText);
      throw new Error(`Server error: ${response.status}`);
    }

    const savedReview = await response.json();

    setReviews((prev) => [
      {
        id: savedReview.id.toString(),
        name: savedReview.name,
        role: savedReview.role,
        rating: savedReview.rating,
        comment: savedReview.comment,
        date: savedReview.timestamp.split("T")[0],
      },
      ...prev,
    ]);

    toast({
      title: "Success",
      description: "Thank you for your review!",
    });

    setNewReview({ name: "", role: "", rating: 5, comment: "" });
    setIsDialogOpen(false);
  } catch (error) {
    console.error("Submit review error:", error);
    toast({
      title: "Error",
      description: "Failed to submit review. Please try again later.",
      variant: "destructive",
    });
  }
};


  const renderStars = (
    rating: number,
    interactive = false,
    onRatingChange?: (r: number) => void
  ) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-400"
          } ${interactive ? "cursor-pointer hover:text-yellow-300" : ""}`}
          onClick={() => interactive && onRatingChange?.(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
              Client Reviews
            </h2>
            <p className="text-xl text-gray-300 font-exo mb-8">
              What people say about working with me
            </p>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="cyber-button">
                  <Plus className="w-4 h-4 mr-2" />
                  Leave a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-blue-500/30">
                <DialogHeader>
                  <DialogTitle className="gradient-text font-orbitron">
                    Add Your Review
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reviewName">Name</Label>
                    <Input
                      id="reviewName"
                      value={newReview.name}
                      onChange={(e) =>
                        setNewReview((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="bg-slate-800 border-blue-500/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reviewRole">Role</Label>
                    <Input
                      id="reviewRole"
                      value={newReview.role}
                      onChange={(e) =>
                        setNewReview((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                      className="bg-slate-800 border-blue-500/30"
                      placeholder="e.g., Designer, Engineer"
                    />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <div className="mt-2">
                      {renderStars(newReview.rating, true, (r) =>
                        setNewReview((prev) => ({ ...prev, rating: r }))
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reviewComment">Comment</Label>
                    <Textarea
                      id="reviewComment"
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview((prev) => ({
                          ...prev,
                          comment: e.target.value,
                        }))
                      }
                      className="bg-slate-800 border-blue-500/30"
                      placeholder="Tell us about your experience..."
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={handleSubmitReview}
                    className="cyber-button w-full"
                  >
                    Submit Review
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Reviews Carousel */}
          {reviews.length > 0 && (
            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: [0, -100 * reviews.length] }}
                transition={{
                  duration: reviews.length * 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex space-x-6"
                style={{ width: `${(reviews.length + 1) * 400}px` }}
              >
                {reviews.map((review, idx) => (
                  <motion.div
                    key={`${review.id}-${idx}`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex-shrink-0 w-80"
                  >
                    <Card className="cyber-card h-64 hover:border-blue-400/50 transition-all duration-300">
                      <CardContent className="p-6 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-orbitron font-semibold text-white">
                                  {review.name}
                                </h4>
                                <p className="text-sm text-blue-300 font-exo">
                                  {review.role}
                                </p>
                              </div>
                            </div>
                            <div>{renderStars(review.rating)}</div>
                          </div>
                          <p className="text-gray-400 text-sm font-exo whitespace-pre-wrap">
                            {review.comment}
                          </p>
                        </div>
                        <p className="text-xs text-blue-500 font-exo mt-4">
                          {review.date}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
