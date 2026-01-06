import { AboutSection } from "@/components/AboutSection"
import { TechStack } from "@/components/TechStack"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/ui/resizable"

export const ResizableSection = () => (
  <section className="h-full w-full p-6">
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full rounded-lg border">
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className="flex h-full items-center justify-center p-8">
            <AboutSection />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className="flex h-full flex-col items-center justify-center p-8">
            <h2 className="mb-8 font-bold text-2xl tracking-tighter sm:text-3xl md:text-4xl">
              Tech Stack
            </h2>
            <div className="w-full flex-1 overflow-auto">
              <TechStack />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  </section>
)
