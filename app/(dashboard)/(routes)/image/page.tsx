'use client'

import * as zod from 'zod';
import Heading from "@/components/Heading"
import { ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { amountOptions, formSchema, resolutionOptions } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ImagePage = () => {
    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: '',
          amount: '1',
          resolution: '512x512'
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
          setImages([]);
          const response: any = await axios.post('/api/image', values);

          const urls = response.data.map((image: { url: string }) => image.url);
          setImages(urls);
          form.reset();
        } catch (error: any) {
          console.error(error);
        } finally {
          router.refresh();
        }
    }

  return (
    <div>
      <Heading 
        title="Image Generation"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />

      <div className="px-4 lg:px-8">
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
                >
                  <FormField
                    name='prompt'
                    render={({ field }) => (
                        <FormItem className='col-span-12 lg:col-span-6' >
                            <FormControl className='m-0 p-0'>
                                <Input 
                                    className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                    disabled={isLoading}
                                    placeholder='A picture of a horse in Swiss alps'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                  />
                  <FormField 
                    name='amount'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className='col-span-12 lg:col-span-2'>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value} />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                          {amountOptions.map((option: any) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField 
                    name='resolution'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className='col-span-12 lg:col-span-2'>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value} />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                          {resolutionOptions.map((option: any) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={isLoading}
                    className='col-span-12 lg:col-span-2 w-full'>
                    Generate
                  </Button>
                </form>
            </Form>
        </div>

        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className='p-20'>
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label='No images generated.' />
          )}
           <div>
              Images will be rendered here
           </div>
        </div>
      </div>
    </div>
  )
}

export default ImagePage
