"use server";

import { JourneyEngine } from "@/lib/engine/journey-engine";
import { revalidatePath } from "next/cache";

export async function startUserJourney(userId: string, journeySlug: string) {
  try {
    const userJourney = await JourneyEngine.startJourney(userId, journeySlug);
    revalidatePath(`/dashboard`);
    revalidatePath(`/jornada/${journeySlug}`);
    return { success: true, userJourney };
  } catch (error: any) {
    console.error("Error starting journey:", error);
    return { success: false, error: error.message };
  }
}

export async function completeUserTask(userJourneyId: string, taskId: string) {
  try {
    await JourneyEngine.completeTask(userJourneyId, taskId);
    revalidatePath(`/dashboard`);
    // Assuming UI calls this on a specific path, the client component could trigger router.refresh()
    return { success: true };
  } catch (error: any) {
    console.error("Error completing task:", error);
    return { success: false, error: error.message };
  }
}

export async function submitUserDecision(userJourneyId: string, decisionId: string, selectedOption: string) {
  try {
    await JourneyEngine.answerDecision(userJourneyId, decisionId, selectedOption);
    revalidatePath(`/dashboard`);
    return { success: true };
  } catch (error: any) {
    console.error("Error answering decision:", error);
    return { success: false, error: error.message };
  }
}
