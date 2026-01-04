"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Sparkles, FolderPlus } from "lucide-react";
import { createProject } from "@/actions/createProject";
import SubmitButton from "@/components/submit-proj-btn";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const NewProjBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Animated glow effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-full blur-md opacity-50"
            animate={{
              opacity: isHovered ? 0.8 : 0.4,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          <Button className="relative bg-gradient-to-r from-primary via-emerald-500 to-primary bg-[length:200%_100%] hover:bg-[length:100%_100%] transition-all duration-500 rounded-full px-6 shadow-lg shadow-primary/25 overflow-hidden group">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
              }}
            />

            <motion.div
              className="relative z-10 flex items-center gap-2"
              animate={{
                x: isHovered ? 2 : 0,
              }}
            >
              <motion.div
                animate={{
                  rotate: isHovered ? 90 : 0,
                  scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <Plus className="w-4 h-4" />
              </motion.div>
              <span className="font-semibold">Create</span>
            </motion.div>

            {/* Sparkle particles on hover */}
            <AnimatePresence>
              {isHovered && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        y: 0,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [-10 + i * 15, -20 + i * 20],
                        y: [-20 - i * 5, -30 - i * 10],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </DialogTrigger>

      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[425px] rounded-2xl bg-background/95 backdrop-blur-xl border-border/50 overflow-hidden">
            {/* Background effects */}
            <motion.div
              className="absolute -right-20 -top-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute -left-20 -bottom-20 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />

            <DialogHeader className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <motion.div
                    className="p-2 rounded-xl bg-primary/10 border border-primary/20"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                  >
                    <FolderPlus className="w-5 h-5 text-primary" />
                  </motion.div>
                  New Project
                </DialogTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <DialogDescription className="text-muted-foreground">
                  Create a new project to start collecting feedback
                </DialogDescription>
              </motion.div>
            </DialogHeader>

            <motion.form
              className="flex gap-4 flex-col relative z-10 mt-4"
              action={createProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Project Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="My Awesome Project"
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </motion.div>
                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 }}
                >
                  <Label
                    htmlFor="url"
                    className="text-sm font-medium text-foreground"
                  >
                    URL
                  </Label>
                  <Input
                    id="url"
                    name="url"
                    placeholder="https://example.com"
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </motion.div>
              </div>
              <motion.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-foreground"
                >
                  Description
                </Label>
                <Textarea
                  name="description"
                  id="description"
                  placeholder="Describe your project (optional)"
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors resize-none min-h-[100px]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.45 }}
                className="pt-2"
              >
                <SubmitButton />
              </motion.div>
            </motion.form>

            {/* Corner decorations */}
            <motion.div
              className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/20 rounded-tr-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/20 rounded-bl-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.55 }}
            />
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default NewProjBtn;
