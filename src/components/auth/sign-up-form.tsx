import { SignUpInputValidation, signUpSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";

export const SignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<SignUpInputValidation>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpInputValidation) => {
    setLoading(true);
    await signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          toast.success(
            "Account created successfully. Please check your email to verify your account."
          );
          form.reset();
          setLoading(false);
        },
        onError: (error) => {
          setLoading(false);
          toast.error(error.error.message);
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form
        className="grid gap-4 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" disabled={loading} />
                </FormControl>
                <FormMessage {...field} className="text-xs text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="name@example.com"
                    type="email"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage {...field} className="text-xs text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" disabled={loading} />
                </FormControl>
                <FormMessage {...field} className="text-xs text-destructive" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading}>
          Create account
          {loading && <Loader className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
