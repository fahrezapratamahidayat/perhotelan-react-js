import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDown, XIcon, WandSparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 drop-shadow-md text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AddresInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  asChild?: boolean;
  options: {
    id: number;
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  defaultValue?: string;
  disabled?: boolean;
  placeholder: string;
  className?: string;
  animation?: number;
  popoperClassName?: string;
  onValueChange: (value: string) => void;
  callback?: (labell: string, value: string, id: number, code: string) => void;
}

const AddresInput = React.forwardRef<HTMLButtonElement, AddresInputProps>(
  (
    {
      className,
      variant,
      asChild = false,
      options,
      defaultValue,
      onValueChange,
      disabled,
      placeholder,
      popoperClassName,
      animation = 0,
      callback,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState("");
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(animation > 0);

    const handleInputKeyDown = (event: any) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.target.value) {
        console.log("backspace");
      }
    };

    const toggleOption = (value: string) => {
      setSelectedValues(value);
      setIsPopoverOpen(!isPopoverOpen);
      onValueChange(value);
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            disabled={disabled}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="flex w-full rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-card px-3"
          >
            {selectedValues && selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center">
                  <span className="text-sm text-foreground">{selectedValues}</span>
                </div>
                <div className="flex items-center justify-between">
                  {/* <XIcon
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      onValueChange("");
                      setIsPopoverOpen(false);
                      event.stopPropagation();
                      setSelectedValues("");
                    }}
                  /> */}
                  <Separator orientation="vertical" className="flex" />
                  <ChevronDown className="h-4 cursor-pointer text-muted-foreground  w-4" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full ">
                <span className="text-sm text-muted-foreground">
                  {placeholder}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground w-4" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-[200px] p-0 drop-shadow-sm", popoperClassName)}
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          onInteractOutside={(event) => {
            if (!event.defaultPrevented) {
              setIsPopoverOpen(false);
            }
          }}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        toggleOption(option.value);
                        if (callback) {
                          callback(option.label, option.value, option.id, "");
                        }
                      }}
                      style={{
                        pointerEvents: "auto",
                        opacity: 1,
                      }}
                      className="cursor-pointer"
                    >
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                {" "}
                {/* <CommandInputDelete /> */}
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={() => {
                          onValueChange("");
                          setIsPopoverOpen(false);
                          setSelectedValues("");
                        }}
                        style={{
                          pointerEvents: "auto",
                          opacity: 1,
                        }}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        Clear
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex min-h-6 h-full"
                      />
                    </>
                  )}
                  <CommandSeparator />
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    style={{
                      pointerEvents: "auto",
                      opacity: 1,
                    }}
                    className="flex-1 justify-center cursor-pointer"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

AddresInput.displayName = "AddresInput";

export default AddresInput;
