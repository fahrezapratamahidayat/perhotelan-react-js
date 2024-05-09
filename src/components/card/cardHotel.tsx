import { Check, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardProps = React.ComponentProps<typeof Card>;

export function CardHotel({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[350px]", className)} {...props}>
      <CardHeader className="px-0 p-0">
        <div className="h-52">
          <img
            src="https://images.unsplash.com/photo-1592555059503-0a774cb8d477?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFsaSUyMHZpbGxhfGVufDB8fDB8fHww"
            className="w-full h-full object-cover rounded"
            alt=""
          />
        </div>
        <CardTitle className="px-2">Villa Santai</CardTitle>
        <div className="px-2">
          <div className="flex items-center">
            <MapPin size={15} className="mr-2 " />
            Kec. Gunungjati, Kabupaten Garut
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">

      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}
