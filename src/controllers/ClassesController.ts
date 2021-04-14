import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  
  async create(request: Request, response: Response) {
  
    const {
      name,
      avatar,
      telegram,
      bio,
      subject,
      price,
      schedule
    } = request.body;
  
    // transaction method works holding all changes until all of them are correctly executed in the database;
    const trx = await db.transaction(); // trx stands for 'transaction';
    
    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        telegram,
        bio,
      });
    
      const user_id = insertedUsersIds[0];
    
      const insertedClassesIds = await trx('classes').insert({
        subject,
        price,
        user_id,
      });
    
      const class_id = insertedClassesIds[0];
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        }
      })
      
      await trx('class_schedule').insert(classSchedule);
    
      await trx.commit(); // executes all changes at this point
    
      return response.status(201).send();
    
    } catch (err) {
      console.log(err);
      await trx.rollback(); // undo any changes made so far in case of error
      
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
  
    }
  
  
  
  }
}

