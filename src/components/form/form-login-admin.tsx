"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useUserStore from "@/hooks/use-session";
import { useLocation } from "react-router-dom";

const formSchema = z.object({
  id: z.string().min(1, {
    message: "Please enter your password.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
});

export default function LoginFormAdmin() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const setUserData = useUserStore((state) => state.setUserData);

  const queryParams = new URLSearchParams(location.search);
  const callbackUrl = queryParams.get("callbackUrl") || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      id: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login/pegawai",
        {
          idPegawai: values.id,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast({
          title: "Login Success",
          description: res.data.message,
          duration: 3000,
        });
        const token = res.data.token;
        const decodedData = jwtDecode(token);
        localStorage.setItem("token", token);
        setUserData(decodedData);
        navigate(callbackUrl);
      } else if (res.status === 400) {
        toast({
          title: "Login Failed",
          description: res.data.message,
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error: AxiosError | any) {
      toast({
        title: "Login Failed",
        description: `${error.response.data.message}`,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukan ID Pegawai / Admin"
                    {...field}
                    type="text"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukan Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <Button className="w-full" disabled>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}
