import knex from "../db/knex";
import { ResumeData } from "@/types/interface.resume";

export class ResumeModel {
  private tableName = 'user_resumeData';

  async findByUserId(userId: string): Promise<ResumeData | null> {
    try {
      const resume = await knex(this.tableName)
        .where('user_id', userId)
        .first();

      return resume || null;
    } catch (error) {
      console.error('Error finding user by User ID: ', error);
      throw error;
    }
  }

  async create(resumeData: ResumeData): Promise<ResumeData> {
    try {
      await knex(this.tableName)
        .insert({
          ...resumeData,
          created_at: new Date(),
          updated_at: new Date()
        });

      const resume = await this.findByUserId(resumeData.user_id);
      if (!resume) {
        throw new Error('Failed to save the user resume data - data not found after creation');
      }

      return resume;
    } catch (error) {
      console.error('Error saving resume data: ', error);
      throw error;
    }
  }

  async update(userId: string, updateData: Partial<ResumeData>): Promise<ResumeData | null> {
    try {
      await knex(this.tableName)
        .where('user_id', userId)
        .update({
          ...updateData,
          updated_at: new Date()
        });

      const resume = await this.findByUserId(userId);
      return resume;
    } catch (error) {
      console.error('Error updating resume data: ', error);
      throw error;
    }
  }
}

export const resumeModel = new ResumeModel();