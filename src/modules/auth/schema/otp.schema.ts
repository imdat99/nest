import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type otpDocument = OTP & Document;

@Schema({ timestamps: true })
export class OTP {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({
    required: true,
  })
  otp: string;

  @Prop({
    required: true,
    default: Date.now,
    index: { expireAfterSeconds: 300 },
  })
  createAt: Date;
}

export const otpSchema = SchemaFactory.createForClass(OTP);
