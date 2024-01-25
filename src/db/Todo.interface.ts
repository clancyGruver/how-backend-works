export interface ITodo {
  /** Идентификатор тудушки */
  id: number;
  /** Название тудушки */
  title: string;
  /** Описание тудушки */
  description: string;
  /** Статус тудушки */
  active: boolean;
  /** Секретные данные только для внутреннего использования */
  secret: string;
}
