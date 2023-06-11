import { DayOfWeek, Role } from "../utils/enum";

export interface IDTO<T = number> {
  id?: T;
}

//#region [Entities]
export interface IUser extends IDTO<string> {
  idCard: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender?: boolean;
  dateOfBirth: Date;
  email?: string;
  address?: string;
  phoneNumber?: string;
  avatar?: string;
  departmentId?: number;
  roles: string[];
}

export interface IStudent extends IUser {
  startYear?: number;
  majorId?: number;
  supervisorId?: string;
  registeredClasses?: number[];
  grades?: IGrade[];
}

export interface ILecturer extends IUser {
  description?: string;
  salary?: number;
  classes?: IClass[];
  students?: IStudent[];
}

export interface IRole extends IDTO<string> {
  name: string;
}

export interface IAnnouncement extends IDTO {
  title: string;
  content: string;
  type: string;
  senderId: string;
}

export interface IClass extends IDTO {
  classCode: string;
  startTime: number;
  endTime: number;
  day: DayOfWeek;
  slot: number;
  courseId: number;
  lecturerId?: string;
  roomId?: number;
  semesterId?: number;

  students: IStudentClass[];
  gradeColumns: IGradeColumn[];
}

export interface IStudentClass {
  studentId: string;
  classId: number;
  groupId?: number;
}

export interface ICourse extends IDTO {
  courseCode: string;
  name: string;
  description?: string;
  credits: number;
  gpaCalculated?: boolean;
  departmentId: number;
  classes?: IClass[];
}

export interface ICoursePrerequisite extends IDTO {
  courseId: number;
  prerequisiteId: number;
}

export interface IDepartment extends IDTO {
  name: string;
  shortName: string;
  description?: string;
  facultyOfficeId: number;
}

export interface IDiscussion extends IDTO {
  title: string;
  type?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGrade extends IDTO {
  value: number;
  gradeColumnId: number;
  studentId: string;
}

export interface IGradeColumn extends IDTO {
  name: string;
  isPublished?: boolean;
  percentage: number;
  classId: number;
  grades?: IGrade[];
}

export interface IGroup extends IDTO {
  name: string;
  projectName: string;
}

export interface IMajor extends IDTO {
  name: string;
  shortName: string;
  description?: string;
  feePerCredit?: number;
  departmentId: number;
}

export interface IMessage extends IDTO {
  content: string;
  type?: number;
  createdAt: Date;
  discussionId: number;
  senderId: string;
}

export interface INotification extends IDTO {
  title: string;
  content: string;
  type?: number;
  createdAt: Date;
  isRead?: boolean;
  isDeleted?: boolean;
  recipientId: string;
}

export interface IRoom extends IDTO {
  code: string;
  type?: number;
  building: string;
  seat?: number;
}
//#endregion

//#region [Models]
export interface ILoginModel {
  username: string;
  password: string;
}

export interface ICurrentUser {
  requestAt: string;
  expiresIn: number;
  tokenType: string;
  accessToken: string;
  refresh_token: string;
  roles: string[];
  id: string;
  idCard: string;
  email: string;
  role: string;
}

export interface IRegisterCoursesModel {
  idCard: string;
  registeredClasses: number[];
}

export interface ITimeSlot {
  startTime: number;
  endTime: number;
  day: DayOfWeek;
}

export interface IConstraint {
  timeSlots?: ITimeSlot[];
  maxClassPerDay?: number;
}
//#endregion
