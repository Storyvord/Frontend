import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AnimatedTooltipPreview } from "../AnimatedTooltipPreview";
import CommentsSection from "./CommentsSection";
import Image from "next/image";

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
};

export default function TaskDetailDialog({ isDialogOpen, setIsDialogOpen }: Props) {
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="sticky top-0 z-10 border-b border p-4 bg-gray-100">
            <DialogTitle className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Task Name</h2>
              <div className=" flex items-center gap-3">
                <button>
                  <Image src="/icons/edit.svg" alt="edit" width={15} height={15} />
                </button>
                <button>
                  <Image src="/icons/share.svg" alt="edit" width={15} height={15} />
                </button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto h-[70vh] space-y-4 p-4 md:p-6 lg:p-8">
            <div className="flex items-center space-x-16">
              <span className="font-medium">Status:</span>
              <Badge className="bg-blue-500 text-white">In Progress</Badge>
            </div>

            <div className="flex items-center space-x-10">
              <span className="font-medium">Due Date:</span>
              <span>5 March 2025</span>
            </div>

            <div className="flex items-center space-x-6">
              <span className="font-medium">Created By:</span>
              <div className=" flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/path-to-image" alt="Created By" />
                  <AvatarFallback>JJ</AvatarFallback>
                </Avatar>
                <span>Jimmy John</span>
              </div>
            </div>

            <div className="flex items-center space-x-5">
              <span className="font-medium">Assigned To:</span>
              <div className="flex space-x-2">
                <AnimatedTooltipPreview />
              </div>
            </div>

            <div className="flex items-center space-x-20">
              <span className="font-medium">Tags:</span>
              <Badge className="bg-purple-500 text-white">Medium</Badge>
            </div>

            <div>
              <span className="font-medium">Description:</span>
              <Textarea
                className="mt-2"
                disabled
                defaultValue="Pre-Production (4 weeks): Research key topics and identify industry experts for interviews. Scout locations, including restaurants, tech hubs, and packaging facilities. Scriptwriting and storyboarding."
              />
            </div>

            <div>
              <span className="font-medium">Attachment:</span>
              <div className="flex space-x-2 mt-2">
                <Button variant="outline" className="space-x-2">
                  <span>script.doc</span>
                </Button>
                <Button variant="outline" className="space-x-2">
                  <span>script.pdf</span>
                </Button>
                <Button variant="outline" className="space-x-2">
                  +
                </Button>
              </div>
            </div>

            <Tabs defaultValue="checklist" className=" w-full">
              <TabsList className="  -ml-2 ">
                <TabsTrigger
                  value="checklist"
                  className="data-[state=active]:bg-gray-200 data-[state=active]:text-black border-none"
                >
                  Checklist
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-gray-200 data-[state=active]:text-black border-none"
                >
                  Comments
                </TabsTrigger>
              </TabsList>
              <TabsContent value="checklist" className=" border p-4 rounded-xl">
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox />
                      <span>Research key topics and identify industry experts for interviews.</span>
                    </div>
                    <span className="text-gray-500 text-sm">Due Tomorrow</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox />
                      <span>Scout locations for interviews and packaging facilities.</span>
                    </div>
                    <span className="text-gray-500 text-sm">Due Tomorrow</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="comments" className=" border p-4 rounded-xl">
                <CommentsSection />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
