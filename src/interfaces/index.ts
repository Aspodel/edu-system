import {
  AssignmentType,
  DayOfWeek,
  DiscussionType,
  MessageType,
  QuestionType,
  Role,
} from "../utils/enum";

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
  tasks?: IStudentTask[];
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
  course?: ICourse;
}

export interface IStudentClass {
  studentId: string;
  classId: number;
  groupId?: number;
  student?: IStudent;
  class?: IClass;
  group?: IGroup;
}

export interface IStudentTask {
  studentId: string;
  toDoItemId: number;
  student?: IStudent;
  toDoItem?: IToDoItem;
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
  description?: string;
  type: DiscussionType;
  createdAt?: Date;
  updatedAt?: Date;
  groupId?: number;
  classId: number;
  creatorId?: string;
  creator?: IUser;
  messages?: IMessage[];
  participants: IUser[];
}

export interface IGrade extends IDTO {
  value?: number;
  gradeColumnId: number;
  studentId: string;
}

export interface IGradeColumn extends IDTO {
  name: string;
  isPublished?: boolean;
  percentage: number;
  order?: number;
  classId: number;
  grades?: IGrade[];
}

export interface IGroup extends IDTO {
  name: string;
  projectName: string;
  students: IStudentClass[];
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
  type?: MessageType;
  createdAt?: Date;
  discussionId: number;
  senderId: string;
  sender?: IUser;
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

export interface IToDoItem extends IDTO {
  title: string;
  description?: string;
  isCompleted?: boolean;
  createdAt?: Date;
  deadline?: Date;
  completedAt?: Date;
  toDoListId: number;
  students: IStudentTask[];
}

export interface IToDoList extends IDTO {
  title: string;
  description?: string;
  groupId?: number;
  items?: IToDoItem[];
}

export interface IAssignment extends IDTO {
  title: string;
  description?: string;
  assignmentType: AssignmentType;
  createdAt: Date;
  dueDate?: Date;
  publishDate?: Date;
  answerPublishDate?: Date;
  classId: number;
  gradeColumnId?: number;
  questions?: IQuestion[];
  submissions?: ISubmission[];
}

export interface ICreateAssignmentModel {
  title: string;
  description?: string;
  assignmentType: AssignmentType;
  dueDate?: Date;
  publishDate?: Date;
  answerPublishDate?: Date;
  classId: number;
  gradeColumnId?: number;
  questions?: IQuestion[];
}

export interface IQuestion extends IDTO {
  content: string;
  questionType: QuestionType;
  points: number;
  assignmentId: number;
  assignment?: IAssignment;
  correctAnswerId?: number;
  correctAnswer?: IAnswer;
  answers?: IAnswer[];
}

export interface IAnswer extends IDTO {
  content: string;
  explanation?: string;
  questionId: number;
  question?: IQuestion;
}

export interface ISubmission extends IDTO {
  createdAt: Date;
  description?: string;
  studentId: string;
  groupId?: number;
  assignmentId: number;
}

export interface IFileSubmission extends ISubmission {
  fileName: string;
  fileUrl?: string;
}

export interface ICreateFileSubmissionModel extends IFileSubmission {
  file: File;
}

export interface IAnswerSubmission extends ISubmission {
  answerId: number;
  answer?: IAnswer;
  questionId: number;
  question?: IQuestion;
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

export interface IGradeRow {
  id: string;
  student: string;
  grades: Record<string, number | undefined>;
}

export interface IStudentGrades {
  course: string;
  grades: { [key: string]: { percentage: number; value: number | null } };
}

export interface ICreateGroupModel {
  name: string;
  projectName: string;
  students: string[];
}

export interface ICreateToDoItemModel extends IDTO {
  title: string;
  description?: string;
  isCompleted?: boolean;
  deadline?: Date;
  toDoListId: number;
  students: string[];
}

export interface ICreateDiscussionModel {
  title: string;
  description?: string;
  type: DiscussionType;
  groupId?: number;
  classId: number;
  creatorId?: string;
  // participants: string[];
}
//#endregion
