/* eslint-disable tailwindcss/classnames-order */
"use client";

import { Category, Companion } from "@prisma/client";
import React from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUpload from "./ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import TextareaAutosize from "react-textarea-autosize";
import { Wand2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const PREAMBLE = `As your trusted financial partner, we're committed to helping you build and manage a diversified investment portfolio that aligns with your long-term objectives. Whether you're saving for retirement, planning for your children's education, or aiming to grow your wealth, we're here to support you every step of the way. By gaining a holistic view of your financial landscape, we can tailor our advice to help you maximize your wealth potential while mitigating risk.
`;

const SEED_CHAT = `Human: How do I get started with investing?
Chatbot: To get started, we'll need to gather some information about your financial situation, including your income, expenses, and any existing investments. Once we have a clear understanding of your financial profile, we can work together to craft a personalized investment plan. Would you like to proceed with a financial assessment?

Human: Yes, I'm ready to provide that information.
Chatbot: Great! Let's begin by gathering some details about your income and expenses. Once we have that information, we can move on to discuss your investment goals and preferences.

Human: I've heard of them but don't know much about them. Could you provide some more information?
Chatbot: Of course! Equities, or stocks, represent ownership in companies and have historically offered higher potential returns over the long term, albeit with higher volatility. Bonds, on the other hand, are debt securities issued by governments or corporations and are generally considered lower-risk investments that provide income through interest payments. Alternative investments, such as real estate or commodities, can offer additional diversification beyond traditional stocks and bonds. Based on your risk profile, we can tailor the allocation of these assets in your portfolio to achieve a balance of growth potential and risk management.
`;

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  instructions: z.string().min(200, {
    message: "Instructions require at least 200 characters.",
  }),
  seed: z.string().min(200, {
    message: "Seed requires at least 200 characters.",
  }),
  src: z.string().min(1, {
    message: "Image is required.",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

const CompanionForm = ({ categories, initialData }: CompanionFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  // form validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isPending = form.formState.isSubmitting;
  const errors = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/companion/${initialData.id}`, values);
      } else {
        await axios.post("/api/companion", values);
      }
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <section className="my-36 w-1/2 mx-auto">
      <div className="mb-4 space-y-1.5">
        <h1 className="text-3xl font-semibold antialiased">
          General Information
        </h1>
        <p className="text-sm text-muted-foreground antialiased">
          Please describe your investment advisor chatbot as good as you can!
        </p>
      </div>
      <hr className="mb-8" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          {/* IMAGE_UPLOAD */}
          <FormField
            name="src"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    onChange={field.onChange}
                    value={field.value}
                    disabled={isPending}
                  />
                </FormControl>
                {errors.src ? (
                  <p className="text-xs font-medium text-red-500">
                    Image is required.
                  </p>
                ) : (
                  <FormDescription className="text-xs">
                    recommended size 240×240px
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          {/* COMPANION_NAME */}

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Investment Goals"
                    {...field}
                  />
                </FormControl>
                {errors.name ? (
                  <p className="text-xs font-medium text-red-500">
                    Name is required.
                  </p>
                ) : (
                  <FormDescription className="text-xs">
                    This is how your investment advisor chatbot will be named.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          {/* COMPANION_DESCRIPTION */}

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Assisting users in setting clear and achievable investment objectives."
                    {...field}
                  />
                </FormControl>
                {errors.description ? (
                  <p className="text-xs font-medium text-red-500">
                    Description is required.
                  </p>
                ) : (
                  <FormDescription className="text-xs">
                    Short description for your investment advisor chatbot.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          {/* COMPANION_CATEGORY */}
          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Category <span className="text-red-600">*</span>
                </FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId ? (
                  <p className="text-xs font-medium text-red-500">
                    Category is required.
                  </p>
                ) : (
                  <FormDescription className="text-xs">
                    Select a category for your investment advisor chatbot.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <div className="space-y-1.5">
            <h1 className="text-3xl font-semibold antialiased">
              Configuration
            </h1>
            <p className="pb-4 text-sm text-muted-foreground antialiased">
              Detailed instructions for your investment advisor AI behaviour.
            </p>
            <hr />
          </div>

          {/* COMPANION_INSTRUCTIONS */}
          <FormField
            name="instructions"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Instructions <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <TextareaAutosize
                    rows={7}
                    disabled={isPending}
                    className="resize-none rounded-md border border-input p-4 text-sm font-normal leading-6"
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                {errors.instructions ? (
                  <p className="text-xs font-medium text-red-500">
                    Instructions require at least 200 characters.
                  </p>
                ) : (
                  <FormDescription className="text-xs">
                    Describe in detail your investment advisor information.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          {/* COMPANION_EXAMPLE_CONVERSATION */}
          <FormField
            name="seed"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Example Conversation <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <TextareaAutosize
                    rows={7}
                    disabled={isPending}
                    className="resize-none rounded-md border border-input p-4 text-sm font-normal leading-6"
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                {errors.seed ? (
                  <p className="text-xs font-medium text-red-500">
                    Seed requires at least 200 characters.
                  </p>
                ) : (
                  <FormDescription className="text-xs">
                    Describe in detail example conversation for your investment
                    advisor.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-3">
            <Button onClick={() => router.back()} variant="outline">
              Cancel
            </Button>
            <Button isLoading={isPending}>
              {initialData ? "Edit Advisor" : "Create Advisor"}
              <Wand2 className="ml-3 size-4" />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CompanionForm;
