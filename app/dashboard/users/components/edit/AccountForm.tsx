'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { Member } from '@/lib/types'
import { useTransition } from 'react'
import { updateAccountById } from '../../actions'
import { useQueryClient } from '@tanstack/react-query'

const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().optional(),
    confirm: z.string().optional(),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Passowrd doesn't match",
    path: ['confirm'],
  })

export default function AccountForm({ permission }: { permission: Member }) {
  const [isPending, startTransition] = useTransition()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: permission.users.email,
      password: '',
      confirm: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const response = JSON.parse(
        await updateAccountById(permission.user_id, {
          password: data.password,
          confirm: data.confirm,
        }),
      )

      if (response.error?.message) {
        toast('Error', {
          description: (
            <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
              <code className='text-white'>{response.error.message}</code>
            </pre>
          ),
        })
      } else {
        toast('Success', { description: 'Successfully updated.' })
        document.getElementById('edit-member')?.click()
        queryClient.invalidateQueries({ queryKey: ['members'] })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='email@gmail.com'
                  type='email'
                  {...field}
                  //   onChange={field.onChange}
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='******'
                  type='password'
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='******'
                  type='password'
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='flex gap-2 items-center w-full'
          variant='outline'
          disabled={isPending}
        >
          Update{' '}
          <Loader className={cn('animate-spin', { hidden: !isPending })} />
        </Button>
      </form>
    </Form>
  )
}
