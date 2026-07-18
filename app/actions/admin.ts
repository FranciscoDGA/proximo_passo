'use server';

import { supabase } from '@/lib/supabase';

export interface UserData {
  id: string;
  name: string | null;
  email: string;
  subscription_tier: string;
  created_at: string;
  journeys_count?: number;
}

export async function getAdminUsers(): Promise<UserData[]> {
  if (!supabase) {
    return [];
  }

  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    // Get journey counts for each user
    const usersWithCounts = await Promise.all(
      (users || []).map(async (user: any) => {
        const { count } = await supabase
          .from('user_journeys')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          subscription_tier: user.subscription_tier || 'free',
          created_at: user.created_at,
          journeys_count: count || 0,
        };
      })
    );

    return usersWithCounts;
  } catch (error) {
    console.error('Error in getAdminUsers:', error);
    return [];
  }
}

export async function deleteAdminUser(userId: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase not available' };
  }

  try {
    // Delete user (this will cascade delete related data due to FK constraints)
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteAdminUser:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}

export async function updateUserSubscription(
  userId: string,
  tier: string
): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Supabase not available' };
  }

  try {
    const { error } = await supabase
      .from('users')
      .update({ subscription_tier: tier })
      .eq('id', userId);

    if (error) {
      console.error('Error updating subscription:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error in updateUserSubscription:', error);
    return { success: false, error: 'Failed to update subscription' };
  }
}
