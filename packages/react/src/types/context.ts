/*
 * File: /src/types/context.ts
 * Project: @themeit/react
 * Created: Sunday, 13th November 2022
 * Author: rashadajtou
 * -----
 * Copyright 2022, ©rashadajtou
 * -----
 */

export type ContextResult<T, K> = [state: Partial<T>, dispatch: Partial<K>];
