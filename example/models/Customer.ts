// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { AddressId } from './Address';
import { z } from 'zod';

/** Identifier type for customer */
export type CustomerId = number & { __flavor?: 'CustomerId' };

/** Represents the table public.customer */
export default interface Customer {
  /** Database type: pg_catalog.int4 */
  customer_id: CustomerId;

  /** Database type: pg_catalog.int2 */
  store_id: number;

  /** Database type: pg_catalog.varchar */
  first_name: string;

  /** Database type: pg_catalog.varchar */
  last_name: string;

  /** Database type: pg_catalog.varchar */
  email: string | null;

  /** Database type: pg_catalog.int2 */
  address_id: AddressId;

  /** Database type: pg_catalog.bool */
  activebool: boolean;

  /** Database type: pg_catalog.date */
  create_date: Date;

  /** Database type: pg_catalog.timestamp */
  last_update: Date | null;

  /** Database type: pg_catalog.int4 */
  active: number | null;
}

/** Represents the initializer for the table public.customer */
export interface CustomerInitializer {
  /**
   * Database type: pg_catalog.int4
   * Default value: nextval('customer_customer_id_seq'::regclass)
   */
  customer_id?: CustomerId;

  /** Database type: pg_catalog.int2 */
  store_id: number;

  /** Database type: pg_catalog.varchar */
  first_name: string;

  /** Database type: pg_catalog.varchar */
  last_name: string;

  /** Database type: pg_catalog.varchar */
  email?: string | null;

  /** Database type: pg_catalog.int2 */
  address_id: AddressId;

  /**
   * Database type: pg_catalog.bool
   * Default value: true
   */
  activebool?: boolean;

  /**
   * Database type: pg_catalog.date
   * Default value: ('now'::text)::date
   */
  create_date?: Date;

  /**
   * Database type: pg_catalog.timestamp
   * Default value: now()
   */
  last_update?: Date | null;

  /** Database type: pg_catalog.int4 */
  active?: number | null;
}

/** Represents the mutator for the table public.customer */
export interface CustomerMutator {
  /** Database type: pg_catalog.int4 */
  customer_id?: CustomerId;

  /** Database type: pg_catalog.int2 */
  store_id?: number;

  /** Database type: pg_catalog.varchar */
  first_name?: string;

  /** Database type: pg_catalog.varchar */
  last_name?: string;

  /** Database type: pg_catalog.varchar */
  email?: string | null;

  /** Database type: pg_catalog.int2 */
  address_id?: AddressId;

  /** Database type: pg_catalog.bool */
  activebool?: boolean;

  /** Database type: pg_catalog.date */
  create_date?: Date;

  /** Database type: pg_catalog.timestamp */
  last_update?: Date | null;

  /** Database type: pg_catalog.int4 */
  active?: number | null;
}

/** Zod schema for customer */
export const customer = z.object({
  customer_id: z.number(),
  store_id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  address_id: z.number(),
  activebool: z.boolean(),
  create_date: z.date(),
  last_update: z.date(),
  active: z.number(),
});
