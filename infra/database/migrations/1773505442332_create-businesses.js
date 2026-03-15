export const up = (pgm) => {
  pgm.createTable("businesses", {
    id: {
      type: "uuid",
      primaryKey: true,
      notNull: true,
      default: pgm.func("gen_random_uuid()"),
    },
    name: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    owner_name: {
      type: "varchar(255)",
      notNull: true,
      unique: false,
    },
    city: {
      type: "varchar(255)",
      notNull: true,
    },
    sector: {
      type: "varchar(255)",
      notNull: true,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
    },
    status: {
      type: "boolean",
      notNull: true,
      default: true,
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });
};
