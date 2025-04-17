//@ts-nocheck
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Check, ArrowLeft, ArrowRight, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
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
} from "@/components/ui/command";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import { ModeToggleSvg } from "@/components/mode-toggle";
import Require from "@/components/ui/require";
import { kota } from "@/data/kota";
import supabase from "@/supabase/client";
import axios from "axios";

const formSchema = z.object({
  fullname: z.string().min(5),
  email: z.string().email(),
  username: z.string().min(5),
  bio: z.string().min(20).max(500).optional(),
  whatsapp: z.string().min(10),
  gender: z.string(),
  birth_date: z.coerce.date(),
  city: z.string(),
  position: z.array(z.string()).nonempty("Silahkan pilih minimal 1"),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Silahkan masukkan URL yang valid" }).optional(),
      })
    )
    .optional(),
});

function generateUsername(fullname: string | null): string {
  if (!fullname) return "";
  return fullname.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
}

export default function OnboardingForm({ steps }: { steps: number[] }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [positions, setPositions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      console.log(user?.user_metadata);
      if (!user) return setLoading(false);

      setAuthUser(user);

      try {
        const [userRes, posRes] = await Promise.all([
          axios.get(`/users?email=${user.email}`),
          axios.get(`/positions`)
        ]);

        setUserData(userRes.data?.[0] ?? null);
        setPositions(posRes.data.map((p: any) => p.name));
      } catch (error) {
        console.error("Error fetching onboarding data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: userData?.fullname ?? authUser?.user_metadata?.full_name ?? "",
      email: authUser?.email ?? "",
      username: userData?.username ?? generateUsername(authUser?.user_metadata?.full_name ?? ""),
      whatsapp: userData?.whatsapp ?? "",
      bio: userData?.bio ?? "",
      gender: userData?.gender ?? "",
      birth_date: userData?.birth_date ? new Date(userData.birth_date) : new Date(),
      city: userData?.city ?? "",
      position: userData?.position ?? [],
      urls: userData?.urls ?? [{ value: "" }],
    },
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  //@ts-ignore
  const handleNextStep = async () => {
    const valid = await form.trigger([
      ...(currentStep === 1 ? ["fullname", "email", "username", "whatsapp"] : []),
      ...(currentStep === 2 ? ["bio", "gender", "urls"] : []),
      ...(currentStep === 3 ? ["birth_date", "city", "position"] : []),
    ]);

    if (!valid) return;

    setIsLoading(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsLoading(false);
    }, 400);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.success("Data berhasil dikirim 🎉");
    setIsSubmitted(true);
    console.log(values);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-left max-w-3xl mx-auto py-10"
      >
        <Stepper value={currentStep} onValueChange={setCurrentStep}>
          {steps.map((step) => (
            <StepperItem
              key={step}
              step={step}
              className="not-last:flex-1"
              loading={isLoading}
            >
              <StepperTrigger asChild>
                <StepperIndicator />
              </StepperTrigger>
              {step < steps.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>

        {isSubmitted ? (
          <div className="text-center text-2xl font-semibold text-green-600 flex items-center justify-center h-40 gap-2">
            <Check className="w-8 h-8 animate-ping-once text-green-500" />
            Berhasil dikirim!
          </div>
        ) : (
          <>
            {currentStep === 1 && (
              <>
                <FormField
                  name="fullname"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Fullname <Require />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Yusuf Pazuruan" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <Require />
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="yusufpazuruan@gmail.com"
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Username <Require />
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="yusufpazuruan" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="whatsapp"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel>
                        Whatsapp <Require />
                      </FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          {...field}
                          placeholder="82196027366"
                          defaultCountry="ID"
                          international
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <FormField
                  name="bio"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="💻 Expert Web App Developer | Full Stack Engineer | Scalable & Secure Web Applications"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        Gender <Require />
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2">
                          {["1", "0"].map((value, idx) => (
                            <Button
                              key={idx}
                              type="button"
                              variant={
                                field.value === value ? "default" : "outline"
                              }
                              onClick={() => field.onChange(value)}
                              className="px-4 py-8 flex-1"
                            >
                              {value === "1" ? "👳‍♀️ Laki-laki" : "🧕 Perempuan"}
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  {fields.map((field, index) => (
                    <FormField
                      key={field.id}
                      name={`urls.${index}.value`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full items-start">
                          <FormLabel className={cn(index !== 0 && "sr-only")}>
                            URLs
                          </FormLabel>
                          <FormDescription
                            className={cn(index !== 0 && "sr-only")}
                          >
                            Add links to your website, blog, or social media
                            profiles.
                          </FormDescription>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://deccay.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className="flex items-start w-full">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => append({ value: "" })}
                    >
                      Add URL
                    </Button>
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <FormField
                  name="birth_date"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Birth date <Require />
                      </FormLabel>
                      <DatetimePicker
                        {...field}
                        value={new Date()}
                        format={[
                          ["months", "days", "years"],
                          ["hours", "minutes", "am/pm"],
                        ]}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="city"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        City <Require />
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? kota.find((k) => k.id === field.value)?.text
                                : "Select city"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search city..." />
                            <CommandList>
                              <CommandEmpty>No city found.</CommandEmpty>
                              <CommandGroup>
                                {kota.map((k) => (
                                  <CommandItem
                                    key={k.id}
                                    value={k.text}
                                    onSelect={() => form.setValue("city", k.id)}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        k.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {k.text}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="position"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Position <Require />
                      </FormLabel>
                      <FormControl>
                        <MultiSelector
                          values={field.value}
                          onValuesChange={field.onChange}
                          loop
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Select position" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              {positions.map((val) => (
                                <MultiSelectorItem key={val} value={val}>
                                  {val}
                                </MultiSelectorItem>
                              ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 4 && (
              <div className="flex items-center justify-center">
                <ModeToggleSvg />
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="w-32"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                disabled={currentStep === 1 || isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Prev
              </Button>
              {currentStep < steps.length ? (
                <Button
                  className="w-32"
                  onClick={handleNextStep}
                  disabled={isLoading}
                >
                  <ArrowRight className="mr-2 h-4 w-4" /> Next
                </Button>
              ) : (
                <Button className="w-32" type="submit" disabled={isLoading}>
                  <Check className="mr-2 h-4 w-4" /> Finish
                </Button>
              )}
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
