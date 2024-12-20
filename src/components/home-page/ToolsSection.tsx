import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ToolsSection() {
  return (
    <section className="py-20 bg-[#f8f8f8]">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Every Tool You Need, All In One Place.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Find Your Crew</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access AI-driven recommendations for crew members, tailored to your project&apos;s
                  specific needs and budget constraints.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Accurate Budgeting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  AI-powered forecasting at your fingertips. Generate precise budget estimates based
                  on your project requirements.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Optimize Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Smarter production planning at your fingertips. Optimize your schedule with
                  AI-driven insights for efficient resource allocation.
                </p>
              </CardContent>
            </Card>
            <Button className="w-full bg-[#1e1e1e] text-white hover:bg-[#2e2e2e]">
              Get Started
            </Button>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg"
              alt="Crew Suggestions"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
