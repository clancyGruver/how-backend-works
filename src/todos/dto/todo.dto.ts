export class TodoDto {
  /** Идентификатор */
  id: number;
  /** Название */
  title: string;
  /** Описание */
  description: string;
  /** Статус */
  active: boolean;
  /** Секретные данные только для внутреннего использования */
  secret: string;
}
