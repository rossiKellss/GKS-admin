import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoginAdminMutation } from "@/app/apiAuthSlice";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const [loginAdmin] = useLoginAdminMutation();
  const onSubmit = async (data) => {
    try {
      const result = await loginAdmin(data).unwrap();
      console.log(result);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 w-full min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="">
        <Card className=" w-full sm:w-96 md:w-[30rem] lg:w-[32rem]">
          <CardHeader>
            <CardTitle>Login to Admin.</CardTitle>
            <CardDescription>
              Welcome! Please signin to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action=""
              className="flex flex-col gap-3 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Label>Email:</Label>
                <Input
                  type="email"
                  name="email"
                  {...register("phoneOrEmail")}
                />
              </div>

              <div>
                <Label>Password:</Label>
                <Input
                  type="Password"
                  name="password"
                  {...register("password")}
                />
              </div>

              <Button type="submit" className="w-full bg-green-500 mt-2">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* <div>
          <h2 className="font-semibold text-primary  text-lg">Login here.</h2>
         
          <form className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-1">
              <Input
                type="email"
                placeholder="Enter you Email"
                className="w-full  bg-transparent border"
              />
            </div>
          </form>
        </div> */}

        {/* <div className="hidden">image</div> */}
      </div>
    </div>
  );
}

export default Login;
