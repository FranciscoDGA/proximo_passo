import { supabase } from './supabase';

export async function saveJourneyProgress(
  userId: string,
  journeyId: string,
  progress: number,
  checklistData: Record<string, boolean>
) {
  const { error } = await supabase
    .from('user_journeys')
    .upsert(
      {
        user_id: userId,
        journey_id: journeyId,
        progress,
        checklist_data: checklistData,
        saved_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,journey_id',
      }
    );

  if (error) {
    console.error('Error saving journey progress:', error);
    throw new Error(error.message);
  }
}

export async function getJourneyProgress(userId: string, journeyId: string) {
  const { data, error } = await supabase
    .from('user_journeys')
    .select('*')
    .eq('user_id', userId)
    .eq('journey_id', journeyId)
    .maybeSingle();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching journey progress:', error);
    throw new Error(error.message);
  }

  return data || null;
}

export async function getUserJourneys(userId: string) {
  const { data, error } = await supabase
    .from('user_journeys')
    .select('*')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false });

  if (error) {
    console.error('Error fetching user journeys:', error);
    throw new Error(error.message);
  }

  return data || [];
}

export async function deleteJourneyProgress(userId: string, journeyId: string) {
  const { error } = await supabase
    .from('user_journeys')
    .delete()
    .eq('user_id', userId)
    .eq('journey_id', journeyId);

  if (error) {
    console.error('Error deleting journey progress:', error);
    throw new Error(error.message);
  }
}
