exports.up = function (knex) {
    return (
      knex.schema
        // tracks
        .createTable("tracks", tbl => {
          tbl.string("id", 255).primary();
  
          tbl.string("name", 255).notNullable().unique();
        })
  
        // units
        .createTable("units", tbl => {
          tbl.string("id", 255).primary();
  
          tbl.string("name", 255).notNullable().index();
  
          // foreign key
          tbl
            .string("track_id", 255)
            .notNullable()
            .references("id")
            .inTable("tracks")
            .onDelete("RESTRICT") // 'CASCADE', 'RESTRICT', 'SET NULL', 'DO NOTHING'
            .onUpdate("CASCADE");
        })
  
        // sprints
        .createTable("sprints", tbl => {
          tbl.string("id", 255).primary();
  
          tbl.string("name", 255).notNullable().index();
  
          // foreign key
          tbl
            .string("unit_id", 255)
            .notNullable()
            .references("id")
            .inTable("units")
            .onDelete("RESTRICT") // 'CASCADE', 'RESTRICT', 'SET NULL', 'DO NOTHING'
            .onUpdate("CASCADE");
        })
  
        // students
        .createTable("students", tbl => {
          tbl.string("id", 255).primary();
  
          tbl.string("name", 255).notNullable().index();
        })
  
        // cohorts
        .createTable("cohorts", tbl => {
          tbl.string("id", 255).primary();
  
          tbl.string("name", 255).notNullable().index();
        })
  
        // student cohorts
        .createTable("student_cohorts", tbl => {
          tbl.string("id", 255).primary();
  
          tbl.date("joined_on");
          tbl.date("left_on");
  
          tbl
            .string("student_id", 255)
            .notNullable()
            .references("id")
            .inTable("students")
            .onDelete("RESTRICT") // 'CASCADE', 'RESTRICT', 'SET NULL', 'DO NOTHING'
            .onUpdate("CASCADE");
  
          tbl
            .string("cohort_id", 255)
            .notNullable()
            .references("id")
            .inTable("cohorts")
            .onDelete("RESTRICT") // 'CASCADE', 'RESTRICT', 'SET NULL', 'DO NOTHING'
            .onUpdate("CASCADE");
  
          tbl.unique(["student_id", "cohort_id"]);
          // tbl.primary(["student_id", "cohort_id"]); // example of a composite key
        })
    );
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("student_cohorts")
      .dropTableIfExists("cohorts")
      .dropTableIfExists("students")
      .dropTableIfExists("sprints")
      .dropTableIfExists("units")
      .dropTableIfExists("tracks");
  };
  