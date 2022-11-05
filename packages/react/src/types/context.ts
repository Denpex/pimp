/*
 * File: /src/types/context.ts
 * Project: @themeit/react
 * Created: Sunday, 13th November 2022
 * Author: Denpex
 * -----
 * Copyright 2022, ©Denpex
 * -----
 */

export type ContextResult<T, K> = [state: Partial<T>, dispatch: Partial<K>];
