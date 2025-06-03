'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Users, Edit, Link as LinkIcon, Trash } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface Waitlist {
  id: string;
  name: string;
  subscribers: number;
  createdAt: string;
}

interface WaitlistTableProps {
  waitlists: Waitlist[];
}

const WaitlistTable: React.FC<WaitlistTableProps> = ({ waitlists }) => {
  const [waitlistsState, setWaitlistsState] = useState(waitlists);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/waitlist/${id}`);
    toast.success('Waitlist link copied to clipboard.');
  };

  const handleDelete = (id: string) => {
    setPendingDelete(id);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setDeletingId(pendingDelete);
    try {
      const res = await fetch(`/api/waitlists/${pendingDelete}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete waitlist');
      setWaitlistsState((prev) => prev.filter((w) => w.id !== pendingDelete));
      toast.success('Waitlist deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete waitlist.');
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Subscribers</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {waitlistsState.map((waitlist) => (
            <TableRow key={waitlist.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-50 flex items-center justify-center">
                    <Users className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="font-medium">{waitlist.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {waitlist.subscribers} subscribers
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <ClientDate dateString={waitlist.createdAt} />
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="text-xs bg-green-50 text-green-700"
                >
                  Active
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/waitlists/${waitlist.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyLink(waitlist.id)}>
                      <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(waitlist.id)}
                      className="text-red-600"
                      disabled={deletingId === waitlist.id}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      {deletingId === waitlist.id ? 'Deleting...' : 'Delete'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Waitlist</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this waitlist? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPendingDelete(null)}
              disabled={deletingId !== null}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deletingId !== null}
            >
              {deletingId ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ClientDate: React.FC<{ dateString: string }> = ({ dateString }) => {
  const [formatted, setFormatted] = useState(dateString);
  useEffect(() => {
    setFormatted(new Date(dateString).toLocaleDateString());
  }, [dateString]);
  return <span>{formatted}</span>;
};

export default WaitlistTable;
