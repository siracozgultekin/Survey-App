import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="border-slate-500 bg-slate-400 bg-opacity-60"
        >
          <Sun className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 text-orange-300 transition-all  dark:-rotate-90 dark:scale-0 " />
          <Moon className="absolute h-[1.3rem] w-[1.3rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Sen alışmışsın güneşli günlere
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Ben gecenin dördü beşiyim
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
