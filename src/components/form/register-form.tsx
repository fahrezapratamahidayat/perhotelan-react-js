/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import axios, { Axios, AxiosError } from "axios";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import { PhoneInput } from "../ui/phone-input";
import AddresInput from "../ui/addres-input";
import { schemesRegistersExtended } from "@/utils/schemas";
import { format } from "date-fns";

const formSchema: z.ZodType = schemesRegistersExtended;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);
  const [formStep, setFormStep] = useState(0);
  const [selectedProvinsiCode, setselectedProvinsiCode] = useState<number>();
  const [selectedKotaCode, setselectedKotaCode] = useState<number>();
  const [selectedKecamatanCode, setselectedKecamatanCode] = useState<number>();

  const navigate = useNavigate();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      type_gender: "",
      age: "",
      phone: "",
      provinsi: "",
      kota: "",
      kecamatan: "",
      kelurahan: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const formattedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        Nama_tamu: values.fullname,
        Jenis_kelamin: values.type_gender,
        Umur_tamu: values.age,
        Email_tamu: values.email,
        Nomer_telephone_tamu: values.phone,
        Alamat_tamu:
          values.provinsi +
          " " +
          values.kota +
          " " +
          values.kecamatan +
          " " +
          values.kelurahan,
        Password: values.password,
        Role_tamu: "guest",
        Status_tamu: "active",
        Pekerjaan: "Software Engineer",
      });
      toast({
        description: res.data.message,
      });
    } catch (error: AxiosError | any) {
      toast({
        title: "Register Failed",
        description: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleProvinsiChange = (label: string, value: string, id: number) => {
    setselectedProvinsiCode(id);
  };
  const handleKotaChange = (label: string, value: string, id: number) => {
    setselectedKotaCode(id);
  };

  const handleKecamatanChange = (label: string, value: string, id: number) => {
    setselectedKecamatanCode(id);
  };

  const handleAge = () => {
    const age = [];
    for (let i = 17; i <= 80; i++) {
      age.push(i);
    }
    return age;
  };

  const age = handleAge();
  const provinsiOptions = provinsi.map(
    (prov: { name: string; id: number; code: string }) => ({
      label: prov.name,
      value: prov.name,
      id: prov.id,
      code: prov.code,
    })
  );

  const kotaOptions = kota.map(
    (kot: { name: string; id: number; code: string; type: string }) => ({
      label: kot.type + " " + kot.name,
      value: kot.name,
      id: kot.id,
      code: kot.code,
    })
  );

  const kecamatanOptions = kecamatan.map(
    (kec: { name: string; id: number; code: string; type: string }) => ({
      label: kec.name,
      value: kec.name,
      id: kec.id,
      code: kec.code,
    })
  );

  const kelurahanOptions = kelurahan.map(
    (kel: { name: string; id: number; code: string; type: string }) => ({
      label: kel.name,
      value: kel.name,
      id: kel.id,
      code: kel.code,
    })
  );

  const handleProvinsi = useCallback(async () => {
    const response = await axios.get(
      "http://localhost:3000/api/location/provinsi"
    );
    return response.data;
  }, []);

  const handleKabukota = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:3000/api/location/kabupaten/${selectedProvinsiCode}`
    );
    return response.data;
  }, [selectedProvinsiCode]);

  const handleKecamatan = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:3000/api/location/kecamatan/${selectedKotaCode}`
    );
    return response.data;
  }, [selectedKotaCode]);

  const handleKelurahan = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:3000/api/location/kelurahan/${selectedKecamatanCode}`
    );
    return response.data;
  }, [selectedKecamatanCode]);

  useEffect(() => {
    handleProvinsi().then((data) => setProvinsi(data));
    handleKabukota().then((data) => setKota(data));
    handleKecamatan().then((data) => setKecamatan(data));
    handleKelurahan().then((data) => setKelurahan(data));
  }, [handleProvinsi, handleKabukota, handleKecamatan, handleKelurahan]);

  useEffect(() => {
    setProvinsi([]);
    setKota([]);
    setKecamatan([]);
    setKelurahan([]);
  }, [selectedProvinsiCode, selectedKotaCode, selectedKecamatanCode]);

  // const handleNextStep = () => {
  //   form.trigger();

  //   if (formStep === 0) {
  //     const isValidStep0 = [
  //       'fullname','age', 'type_gender', 'phone'
  //     ].every(field => !form.getFieldState(field).error);
  //     if (isValidStep0) {
  //       setFormStep(1);
  //     } else {
  //       toast({
  //         title: "Failed",
  //         description: "Please fill all required fields correctly.",
  //         variant: "destructive",
  //         duration: 2000,
  //       });
  //     }
  //   } else if (formStep === 1) {
  //     const isValidStep1 = [
  //       'provinsi', 'kota', 'kecamatan', 'kelurahan'
  //     ].every(field => !form.getFieldState(field).error);

  //     if (isValidStep1) {
  //       setFormStep(2);
  //     } else {
  //       toast({
  //         title: "Failed",
  //         description: "Please complete all address fields correctly.",
  //         variant: "destructive",
  //         duration: 2000,
  //       });
  //     }
  //   }
  // }

  const stepFields = [
    ["fullname", "age", "type_gender", "phone"],
    ["provinsi", "kota", "kecamatan", "kelurahan"],
    ["email", "password", "confirmPassword"],
  ];

  const handleNextStep = async () => {
    const stepFields = [
      ["fullname", "age", "type_gender", "phone"],
      ["provinsi", "kota", "kecamatan", "kelurahan"],
      ["email", "password", "confirmPassword"],
    ];
    const isCurrentStepValid = await form.trigger(stepFields[formStep]);

    if (isCurrentStepValid) {
      if (formStep < stepFields.length - 1) {
        setFormStep(formStep + 1);
      }
    } else {
      toast({
        title: "Failed",
        description: "Halaman ini harus diisi dengan benar.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative overflow-x-hidden">
            <motion.div
              className={cn("pb-1 px-1 space-y-2", {
                // hidden: formStep == 1,
              })}
              // formStep == 0 -> translateX == 0
              // formStep == 1 -> translateX == '-100%'
              animate={{
                translateX: `-${formStep * 100}%`,
              }}
              transition={{
                ease: "easeInOut",
              }}
            >
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="John doe" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type_gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder="Jenis Kelamin"
                            className="text-muted-foreground"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                        <SelectItem value="Perempuan">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Umur</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Umur" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {age.map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Nomor Telepon</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="Nomor Telepon"
                        {...field}
                        international
                        defaultCountry="ID"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              className={cn(
                "absolute top-0 left-0 right-0 pb-1 px-1 space-y-1",
                {
                  // hidden: formStep == 0,
                }
              )}
              // formStep == 0 -> translateX == 100%
              // formStep == 1 -> translateX == 0
              animate={{
                translateX: `${100 - formStep * 100}%`,
              }}
              style={{
                translateX: `${100 - formStep * 100}%`,
              }}
              transition={{
                ease: "easeInOut",
              }}
            >
              <FormField
                control={form.control}
                name="provinsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provinsi</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <AddresInput
                          placeholder="Provinsi"
                          {...field}
                          options={provinsiOptions}
                          onValueChange={field.onChange}
                          callback={handleProvinsiChange}
                        />
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kota"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kabupaten</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <AddresInput
                          placeholder="Kabupaten"
                          {...field}
                          options={kotaOptions}
                          disabled={kotaOptions.length == 0}
                          onValueChange={field.onChange}
                          callback={handleKotaChange}
                        />
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kecamatan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kecamatan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <AddresInput
                          placeholder="kecamatan"
                          {...field}
                          options={kecamatanOptions}
                          disabled={kecamatanOptions.length == 0}
                          onValueChange={field.onChange}
                          callback={handleKecamatanChange}
                        />
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kelurahan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kelurahan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <AddresInput
                          placeholder="Kelurahan"
                          {...field}
                          options={kelurahanOptions}
                          disabled={kelurahanOptions.length == 0}
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
            <motion.div
              className={cn(
                "absolute top-0 left-0 right-0 pb-1 px-1 space-y-1",
                {
                  // hidden: formStep == 0,
                }
              )}
              // formStep == 0 -> translateX == 100%
              // formStep == 1 -> translateX == 0
              animate={{
                translateX: `${200 - formStep * 100}%`,
              }}
              style={{
                translateX: `${100 + formStep * 200}%`,
              }}
              transition={{
                ease: "easeInOut",
              }}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        {...field}
                        type="email"
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
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@gmail.com"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => {
                setFormStep(formStep - 1);
              }}
              className={cn("mt-2", {
                hidden: formStep == 0,
              })}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Button
              variant={"ghost"}
              className={cn("mt-2", {
                hidden: formStep == 2,
              })}
              type="button"
              onClick={handleNextStep}
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            {isLoading ? (
              <Button className="mt-2" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className={cn(`mt-2 w-28 ${formStep == 1 || formStep == 0 ? "hidden" : ""}`, {})}
              >
                Register
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
