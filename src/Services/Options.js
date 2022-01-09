import { useDragOptions } from 'Hooks/useOptions';
import { useOptions } from 'Hooks/useOptions';

export const CollaboratersOptions = () =>
  useOptions('/collaboraters/get/as/choices', ['id', 'fullName'], 'post');
export const UserOptions = () => useOptions('/users/get', ['id', 'fullName'], 'post', 'users');

export const DepartementOptions = () =>
  useOptions('/departments/as/choices', ['id', 'departmentName'], 'get', 'departments');

export const JobOptions = () => useOptions('/jobs/as/choices', ['id', 'jobName'], 'get', 'jobs');
export const RolesOptions = () => useOptions('/roles', ['id', 'label'], 'get');
export const SkillOptions = () =>
  useOptions('/skills?skillName=&page=1&limit=100', ['id', 'skillName'], 'get', 'skills');
export const SubjectsOptions = () =>
  useOptions('/subjects/as/choices?subject=', ['id', 'subject'], 'get', 'subjects');

export const DemandeOptions = () =>
  useOptions('/subjects/as/choices?status=true&subject=', ['id', 'subject'], 'get', 'subjects');
export const ContractModelOptions = (filter = ['id', 'name']) =>
  useOptions('/contract_models/as/choices?model_name=', filter, 'get', 'contractModels');
export const HardwaresOptions = () =>
  useOptions('/hardwares/types/as/choices?label=', ['id', 'label'], 'get', 'hardware_types');
export const ExpensesOptions = () =>
  useOptions('/expenses/types/get-as-choices', ['id', 'type'], 'get', 'expenses_types');
export const RechargeOptions = () =>
  useOptions('/recharges/types/get-as-choices', ['id', 'type'], 'get', 'recharges_types');
export const RoleOptions = () => useOptions('/roles', ['id', 'label'], 'get', '');
export const TypeOptions = () =>
  useOptions('/special-leaves/types/as/choices', ['id', 'type'], 'get', 'special_leaves_types');

export const ArticlesCurrent = (id) =>
  useDragOptions(`/contract_models/${id}`);
