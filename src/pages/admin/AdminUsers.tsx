import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  is_admin: boolean | null;
  plan_type?: 'free' | 'pro' | 'enterprise' | null;
  created_at: string | null;
}

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) {
        toast.error('Failed to load users');
        return [];
      }
      return data as UserProfile[];
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (user: UserProfile) => {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: user.full_name,
          username: user.username,
          is_admin: user.is_admin,
          plan_type: user.plan_type,
        })
        .eq('id', user.id);
      if (error) throw error;
      return user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsEditDialogOpen(false);
      toast.success('User updated successfully');
    },
    onError: () => toast.error('Failed to update user'),
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase.from('profiles').delete().eq('id', userId);
      if (error) throw error;
      return userId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsDeleteDialogOpen(false);
      toast.success('User deleted successfully');
    },
    onError: () => toast.error('Failed to delete user'),
  });

  const handleUpdateUser = () => {
    if (selectedUser) updateUserMutation.mutate(selectedUser);
  };

  const handleDeleteUser = () => {
    if (selectedUser) deleteUserMutation.mutate(selectedUser.id);
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout pageTitle="Manage Users">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Users</CardTitle>
          <div className="relative w-64">
            <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Plan</th>
                  <th className="px-4 py-2 text-left">Admin</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={6} className="text-center py-4">Loading...</td></tr>
                ) : filteredUsers?.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-4">No users found</td></tr>
                ) : (
                  filteredUsers?.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-4 py-2">{user.full_name || 'N/A'}</td>
                      <td className="px-4 py-2">{user.username || 'N/A'}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2 capitalize">{user.plan_type || 'free'}</td>
                      <td className="px-4 py-2">{user.is_admin ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-2 space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedUser(user); setIsEditDialogOpen(true); }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => { setSelectedUser(user); setIsDeleteDialogOpen(true); }}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {selectedUser && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Modify access level and identity</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Email</Label>
                <Input value={selectedUser.email} disabled className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Full Name</Label>
                <Input
                  value={selectedUser.full_name || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, full_name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Username</Label>
                <Input
                  value={selectedUser.username || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Plan Type</Label>
                <Select
                  value={selectedUser.plan_type || 'free'}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, plan_type: value as UserProfile['plan_type'] })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Admin</Label>
                <select
                  value={selectedUser.is_admin ? 'yes' : 'no'}
                  onChange={(e) => setSelectedUser({ ...selectedUser, is_admin: e.target.value === 'yes' })}
                  className="col-span-3 border rounded px-2 py-1"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateUser} disabled={updateUserMutation.isPending}>
                {updateUserMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Dialog */}
      {selectedUser && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>This action is irreversible. Continue?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteUser} disabled={deleteUserMutation.isPending}>
                {deleteUserMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
};

export default AdminUsers;
