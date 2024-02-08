import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Database } from "@/lib/schema";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesDetailsDialog({ species }: { species: Species }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{species.scientific_name}</DialogTitle>
          {species.common_name && <DialogDescription>{species.common_name}</DialogDescription>}
        </DialogHeader>
        {/* TODO: implement form */}
      </DialogContent>
    </Dialog>
  );
}
// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/components/ui/use-toast";
// import { createBrowserSupabaseClient } from "@/lib/client-utils";
// import { type Database } from "@/lib/schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
// import { Form, useForm } from "react-hook-form";
// // import Input from "react-select/dist/declarations/src/components/Input";
// import { type BaseSyntheticEvent } from "react";
// import { z } from "zod";

// type Species = Database["public"]["Tables"]["species"]["Row"];

// // Define kingdom enum for use in Zod schema and displaying dropdown options in the form
// const kingdoms = z.enum(["Animalia", "Plantae", "Fungi", "Protista", "Archaea", "Bacteria"]);

// // Use Zod to define the shape + requirements of a Species entry; used in form validation
// const speciesSchema = z.object({
//   scientific_name: z
//     .string()
//     .trim()
//     .min(1)
//     .transform((val) => val?.trim()),
//   common_name: z
//     .string()
//     .nullable()
//     // Transform empty string or only whitespace input to null before form submission, and trim whitespace otherwise
//     .transform((val) => (!val || val.trim() === "" ? null : val.trim())),
//   kingdom: kingdoms,
//   total_population: z.number().int().positive().min(1).nullable(),
//   image: z
//     .string()
//     .url()
//     .nullable()
//     // Transform empty string or only whitespace input to null before form submission, and trim whitespace otherwise
//     .transform((val) => (!val || val.trim() === "" ? null : val.trim())),
//   description: z
//     .string()
//     .nullable()
//     // Transform empty string or only whitespace input to null before form submission, and trim whitespace otherwise
//     .transform((val) => (!val || val.trim() === "" ? null : val.trim())),
// });

// export default function SpeciesDetailsDialog({ species }: { species: Species }) {
//   const form = useForm({
//     resolver: zodResolver(speciesSchema),
//     defaultValues: {
//       scientific_name: species.scientific_name,
//       common_name: species.common_name ?? "",
//       kingdom: species.kingdom,
//       total_population: species.total_population,
//       image: species.image ?? "",
//       description: species.description ?? "",
//     },
//   });

//   const onSubmit = async (data: z.infer<typeof speciesSchema>) => {
//     const supabase = createBrowserSupabaseClient();
//     const { error } = await supabase
//       .from("species")
//       .update({
//         common_name: data.common_name,
//         description: data.description,
//         kingdom: data.kingdom,
//         scientific_name: data.scientific_name,
//         total_population: data.total_population,
//         image: data.image,
//       })
//       .match({ id: species.id });

//     if (error) {
//       toast({
//         title: "Something went wrong.",
//         description: error.message,
//         variant: "destructive",
//       });
//       return;
//     }

//     toast({
//       title: "Species updated!",
//       description: "Successfully updated " + data.scientific_name + ".",
//     });
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="mt-3 w-full">Learn More</Button>
//       </DialogTrigger>
//       <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>{species.scientific_name}</DialogTitle>
//           {species.common_name && <DialogDescription>{species.common_name}</DialogDescription>}
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={(e: BaseSyntheticEvent) => void form.handleSubmit(onSubmit)(e)}>
//             <div className="grid w-full items-center gap-4">
//               {/* Scientific Name */}
//               <FormField
//                 name="scientific_name"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Scientific Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="Scientific Name" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Common Name */}
//               <FormField
//                 name="common_name"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Common Name</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="Common Name" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Kingdom */}
//               <FormField
//                 name="kingdom"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Kingdom</FormLabel>
//                     <Select onValueChange={(value) => form.setValue("kingdom", value)} value={field.value}>
//                       <SelectTrigger aria-label="Kingdom">
//                         <SelectValue placeholder="Select Kingdom" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           {kingdoms.options.map((option) => (
//                             <SelectItem key={option} value={option}>
//                               {option}
//                             </SelectItem>
//                           ))}
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Total Population */}
//               <FormField
//                 name="total_population"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Total Population</FormLabel>
//                     <FormControl>
//                       <Input type="number" {...field} placeholder="Total Population" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Image */}
//               <FormField
//                 name="image"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Image URL</FormLabel>
//                     <FormControl>
//                       <Input {...field} placeholder="https://example.com/image.jpg" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {/* Description */}
//               <FormField
//                 name="description"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Description</FormLabel>
//                     <FormControl>
//                       <Textarea {...field} placeholder="Description" />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex">
//                 <Button type="submit" className="ml-1 mr-1 flex-auto">
//                   Update Species
//                 </Button>
//                 <DialogClose asChild>
//                   <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
//                     Cancel
//                   </Button>
//                 </DialogClose>
//               </div>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default function SpeciesDetailsDialog({ species }: { species: Species }) {
//   const form = useForm({
//     resolver: zodResolver(speciesSchema),
//     defaultValues: {
//       scientific_name: species.scientific_name,
//       common_name: species.common_name ?? "",
//       kingdom: species.kingdom,
//       total_population: species.total_population,
//       image: species.image ?? "",
//       description: species.description ?? "",
//     },
//   });

//   const onSubmit = async (input: z.infer<typeof speciesSchema>) => {
//     const supabase = createBrowserSupabaseClient();
//     const { error } = await supabase.from("species").update({
//       common_name: input.common_name,
//       description: input.description,
//       kingdom: input.kingdom,
//       scientific_name: input.scientific_name,
//       total_population: input.total_population,
//       image: input.image,
//     }).match({ id: species.id });

//     if (error) {
//       toast({
//         title: "Something went wrong.",
//         description: error.message,
//         variant: "destructive",
//       });
//       return;
//     }

//     toast({
//       title: "Species updated!",
//       description: "Successfully updated " + input.scientific_name + ".",
//     });
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="mt-3 w-full">Learn More</Button>
//       </DialogTrigger>
//       <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>{species.scientific_name}</DialogTitle>
//           {species.common_name && <DialogDescription>{species.common_name}</DialogDescription>}
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className="grid w-full items-center gap-4">
//               <FormField
//                 control={form.control}
//                 name="scientific_name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Scientific Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Cavia porcellus" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="common_name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Common Name</FormLabel>
//                     <FormControl>
//                       <Input value={field.value ?? ""} placeholder="Guinea pig" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="kingdom"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Kingdom</FormLabel>
//                     <Select onValueChange={(value) => field.onChange(kingdoms.parse(value))} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a kingdom" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectGroup>
//                           {kingdoms.options.map((kingdom, index) => (
//                             <SelectItem key={index} value={kingdom}>
//                               {kingdom}
//                             </SelectItem>
//                           ))}
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="total_population"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Total population</FormLabel>
//                     <FormControl>
//                       <Input type="number" placeholder="300000" {...field} onChange={(event) => field.onChange(+event.target.value)} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="image"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Image URL</FormLabel>
//                     <FormControl>
//                       <Input value={field.value ?? ""} placeholder="https://example.com/image.jpg" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Description</FormLabel>
//                     <FormControl>
//                       <Textarea value={field.value ?? ""} placeholder="Species description here..." {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex">
//                 <Button type="submit" className="ml-1 mr-1 flex-auto">
//                   Update Species
//                 </Button>
//                 <DialogClose asChild>
//                   <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
//                     Cancel
//                   </Button>
//                 </DialogClose>
//               </div>
//             </div>
//           </form>
//         </Form>

//       </DialogContent>
//     </Dialog>
//   );
// }

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { type Database } from "@/lib/schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { type BaseSyntheticEvent } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// type Species = Database["public"]["Tables"]["species"]["Row"];

// // type Props = {
// //   species : Species;
// //   onClose: () => void;
// // }

// const kingdoms = z.enum(["Animalia", "Plantae", "Fungi", "Protista", "Archaea", "Bacteria"]);

// const speciesSchema = z.object({
//   scientific_name: z
//     .string()
//     .trim()
//     .min(1)
//     .transform((val) => val?.trim()),
//   common_name: z
//     .string()
//     .nullable()
//     // Transform empty string or only whitespace input to null before form submission, and trim whitespace otherwise
//     .transform((val) => (!val || val.trim() === "" ? null : val.trim())),
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//   kingdom: kingdoms,
//   total_population: z.number().int().positive().min(1).nullable(),
//   image: z
//     .string()
//     .url()
//     .nullable()
//     // Transform empty string or only whitespace input to null before form submission, and trim whitespace otherwise
//     .transform((val) => (!val || val.trim() === "" ? null : val.trim())),
//   description: z
//     .string()
//     .nullable()
//     // Transform empty string or only whitespace input to null before form submission, and trim whitespace otherwise
//     .transform((val) => (!val || val.trim() === "" ? null : val.trim())),
// });

// const defaultValues: Partial<FormData> = {
//   scientific_name: "",
//   common_name: null,
//   kingdom: "Animalia",
//   total_population: null,
//   image: null,
//   description: null,
// };

// export default function SpeciesDetailsDialog({ species }: { species: Species }) {

//   const { register, handleSubmit, formState: { errors } } = useForm<Species>({
//     defaultValues: species,
//   });

//   // placeholder
//   const onSubmit = (data: Species) => {
//     console.log(data);
//     // editing functionality
//   };

//   const form = useForm<FormData>({
//     resolver: zodResolver(speciesSchema),
//     defaultValues,
//     mode: "onChange",
//   });

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="mt-3 w-full">Learn More</Button>
//       </DialogTrigger>
//       <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>{species.scientific_name}</DialogTitle>
//           {species.common_name && <DialogDescription>{species.common_name}</DialogDescription>}
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid w-full items-center gap-4">
//               <FormField
//                 control={form.control}
//                 name="scientific_name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Scientific Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Cavia porcellus" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="common_name"
//                 render={({ field }) => {
//                   // We must extract value from field and convert a potential defaultValue of `null` to "" because inputs can't handle null values: https://github.com/orgs/react-hook-form/discussions/4091
//                   const { value, ...rest } = field;
//                   return (
//                     <FormItem>
//                       <FormLabel>Common Name</FormLabel>
//                       <FormControl>
//                         <Input value={value ?? ""} placeholder="Guinea pig" {...rest} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />
//               <FormField
//                 control={form.control}
//                 name="kingdom"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Kingdom</FormLabel>
//                     <Select onValueChange={(value) => field.onChange(kingdoms.parse(value))} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a kingdom" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectGroup>
//                           {kingdoms.options.map((kingdom, index) => (
//                             <SelectItem key={index} value={kingdom}>
//                               {kingdom}
//                             </SelectItem>
//                           ))}
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="total_population"
//                 render={({ field }) => {
//                   const { value, ...rest } = field;
//                   return (
//                     <FormItem>
//                       <FormLabel>Total population</FormLabel>
//                       <FormControl>
//                         {/* Using shadcn/ui form with number: https://github.com/shadcn-ui/ui/issues/421 */}
//                         <Input
//                           type="number"
//                           value={value ?? ""}
//                           placeholder="300000"
//                           {...rest}
//                           onChange={(event) => field.onChange(+event.target.value)}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />
//               <FormField
//                 control={form.control}
//                 name="image"
//                 render={({ field }) => {
//                   // We must extract value from field and convert a potential defaultValue of `null` to "" because inputs can't handle null values: https://github.com/orgs/react-hook-form/discussions/4091
//                   const { value, ...rest } = field;
//                   return (
//                     <FormItem>
//                       <FormLabel>Image URL</FormLabel>
//                       <FormControl>
//                         <Input
//                           value={value ?? ""}
//                           placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/George_the_amazing_guinea_pig.jpg/440px-George_the_amazing_guinea_pig.jpg"
//                           {...rest}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => {
//                   // We must extract value from field and convert a potential defaultValue of `null` to "" because textareas can't handle null values: https://github.com/orgs/react-hook-form/discussions/4091
//                   const { value, ...rest } = field;
//                   return (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           value={value ?? ""}
//                           placeholder="The guinea pig or domestic guinea pig, also known as the cavy or domestic cavy, is a species of rodent belonging to the genus Cavia in the family Caviidae."
//                           {...rest}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   );
//                 }}
//               />
//               <div className="flex">
//                 <Button type="submit" className="ml-1 mr-1 flex-auto">
//                   Add Species
//                 </Button>
//                 <DialogClose asChild>
//                   <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary">
//                     Cancel
//                   </Button>
//                 </DialogClose>
//               </div>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
