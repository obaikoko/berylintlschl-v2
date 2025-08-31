'use client';

import { useState } from 'react';
import { useGenerateBroadsheetMutation } from '@/src/features/results/resultApiSlice';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Loader2} from 'lucide-react';
import BroadsheetTable from './bradsheet-table';
import { showZodErrors } from '@/lib/utils';
import { sessions, terms, levels, subLevels } from '@/lib/utils';

export default function BradsheetPage() {
  const [generateBroadsheet, { isLoading, isError }] =
    useGenerateBroadsheetMutation();

  const [broadsheet, setBroadsheet] = useState([]);
  const [session, setSession] = useState('');
  const [term, setTerm] = useState('');
  const [level, setLevel] = useState('');
  const [subLevel, setSubLevel] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await generateBroadsheet({
        session,
        term,
        level,
        subLevel,
      }).unwrap();
      setBroadsheet(res || []);
      setDialogOpen(false);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <div className='max-w-5xl mx-auto p-6 space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Broadsheet Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-4'>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>Generate Broadsheet</Button>
              </DialogTrigger>
              <DialogContent className='max-w-md'>
                <DialogHeader>
                  <DialogTitle>Generate Broadsheet</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className='space-y-4'>
                  <Select value={session} onValueChange={setSession}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Session' />
                    </SelectTrigger>
                    <SelectContent>
                      {sessions.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={term} onValueChange={setTerm}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Term' />
                    </SelectTrigger>
                    <SelectContent>
                      {terms.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Class' />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((lvl) => (
                        <SelectItem key={lvl} value={lvl}>
                          {lvl}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={subLevel} onValueChange={setSubLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Sub-Class' />
                    </SelectTrigger>
                    <SelectContent>
                      {subLevels.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <DialogFooter>
                    <Button
                      type='submit'
                      disabled={isLoading}
                      className='w-full'
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
                          Generating...
                        </>
                      ) : (
                        'Generate'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Table section */}
      <div className='space-y-4'>
        <h2 className='text-xl font-semibold text-center'>Broadsheet Result</h2>
        {isError && (
          <p className='text-center text-red-600'>Unable to fetch data</p>
        )}
        <BroadsheetTable data={broadsheet} />
      </div>
    </div>
  );
}
