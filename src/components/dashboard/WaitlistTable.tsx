'use client';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Users, ArrowUpRight, Edit, Link as LinkIcon, Trash, Settings } from 'lucide-react';

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
  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/waitlist/${id}`);
  };

  // TODO: Implement delete logic
  const handleDelete = (id: string) => {
    // Placeholder for delete action
    alert('Delete not implemented yet: ' + id);
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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {waitlists.map((waitlist) => (
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
                <div className="text-sm text-muted-foreground">
                  {new Date(waitlist.createdAt).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                  Active
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
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
                    <DropdownMenuItem onClick={() => handleDelete(waitlist.id)} className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WaitlistTable; 