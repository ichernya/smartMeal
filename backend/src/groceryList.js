const {Pool} = require('pg');

const user = "postgres";
const host = "localhost";
const database = "dev";
const password = "postgres";
const port = "5432";

const pool = new Pool({
  host: host,
  port: port,
  database: database,
  user: user,
  password: password,
});

const updatePutQuery = async (firstDay, mealsid, category, ingredient) => {
    const update = `
    UPDATE checklistUser
    SET checklist = jsonb_set(checklist, $3, 'true', true)
    WHERE mealsid = $2 AND firstDay = $1;`
    const query = {
        text: update,
        values: [firstDay, mealsid, `{${category},"ingredients","${ingredient}","checked"}`]
    }
    await pool.query(query);
    // category mapping to value wouldnt work in values, so query design had to change
    // weird conversions because integer cant cast to jsonb, but integer can to text then to jsonb
    const result = await pool.query(
      `UPDATE checklistUser
       SET checklist = jsonb_set(checklist, '{${category},amountChecked}', ((checklist->'${category}'->>'amountChecked')::integer + 1)::text::jsonb)      
       WHERE mealsid = $2 AND firstDay = $1
       RETURNING checklist`,
      [firstDay, mealsid]
    );
    const updatedList = result.rows[0].checklist;
    return updatedList;
    
}

const downdatePutQuery = async (firstDay, mealsid, category, ingredient) => {
    const update = `
    UPDATE checklistUser
    SET checklist = jsonb_set(checklist, $3, 'false', false)
    WHERE mealsid = $2 AND firstDay = $1;`
    const query = {
        text: update,
        values: [firstDay, mealsid, `{${category},"ingredients","${ingredient}","checked"}`]
    }
    await pool.query(query);

    // category mapping to value wouldnt work in values, so query design had to change
    // weird conversions because integer cant cast to jsonb, but integer can to text then to jsonb
    const result = await pool.query(
      `UPDATE checklistUser
       SET checklist = jsonb_set(checklist, '{${category},amountChecked}', ((checklist->'${category}'->>'amountChecked')::integer - 1)::text::jsonb)      
       WHERE mealsid = $2 AND firstDay = $1
       RETURNING checklist`,
      [firstDay, mealsid]
    );

    const updatedList = result.rows[0].checklist;

    return updatedList;
    
}
exports.updateAsChecked = async (req, res) => {
  var update;
  console.log(req.body.check);
    if (req.body.check) {
      update = await updatePutQuery(req.body.firstDay, req.body.mealsid, req.body.category, req.body.ingredient);
    } else {
      update = await downdatePutQuery(req.body.firstDay, req.body.mealsid, req.body.category, req.body.ingredient);
    }
    res.status(201).json(update)
}