import fs from "fs";
import path from "path";
import yaml from "yaml";
import { db } from "../lib/db"; // Ajuste o path conforme sua estrutura

async function syncJDL() {
  const jdlDir = path.join(process.cwd(), "data", "jdl");
  if (!fs.existsSync(jdlDir)) {
    console.log("Diretório de JDL não encontrado.");
    return;
  }

  const files = fs.readdirSync(jdlDir).filter(f => f.endsWith(".yml") || f.endsWith(".yaml"));

  console.log(`Encontrados ${files.length} arquivos JDL. Iniciando sincronização...`);

  for (const file of files) {
    const content = fs.readFileSync(path.join(jdlDir, file), "utf8");
    const data = yaml.parse(content);

    try {
      // Upsert Journey
      const journey = await db.journey.upsert({
        where: { slug: data.slug },
        update: {
          title: data.title,
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
          universe: data.universe,
          category: data.category,
          estimatedTime: data.estimatedTime,
          complexity: data.complexity,
          emotionalLevel: data.emotionalLevel,
          seoPillar: data.seoPillar,
        },
        create: {
          id: data.id,
          slug: data.slug,
          title: data.title,
          shortDescription: data.shortDescription,
          longDescription: data.longDescription,
          universe: data.universe,
          category: data.category,
          estimatedTime: data.estimatedTime,
          complexity: data.complexity,
          emotionalLevel: data.emotionalLevel,
          seoPillar: data.seoPillar,
        }
      });

      console.log(`✅ Jornada [${journey.slug}] sincronizada.`);

      // Sincronizar Stages
      if (data.stages && Array.isArray(data.stages)) {
        for (const stageData of data.stages) {
          const stage = await db.stage.upsert({
            where: { id: stageData.id },
            update: {
              order: stageData.order,
              title: stageData.title,
              description: stageData.description,
              unlockRule: stageData.unlockRule,
            },
            create: {
              id: stageData.id,
              journeyId: journey.id,
              order: stageData.order,
              title: stageData.title,
              description: stageData.description,
              unlockRule: stageData.unlockRule,
            }
          });

          // Sincronizar Tasks
          if (stageData.tasks && Array.isArray(stageData.tasks)) {
            for (const taskData of stageData.tasks) {
              await db.task.upsert({
                where: { id: taskData.id },
                update: {
                  title: taskData.title,
                  description: taskData.description,
                  taskType: taskData.taskType,
                  estimatedMinutes: taskData.estimatedMinutes,
                },
                create: {
                  id: taskData.id,
                  stageId: stage.id,
                  title: taskData.title,
                  description: taskData.description,
                  taskType: taskData.taskType,
                  estimatedMinutes: taskData.estimatedMinutes,
                }
              });
            }
          }

          // Sincronizar Decisions
          if (stageData.decisions && Array.isArray(stageData.decisions)) {
            for (const decData of stageData.decisions) {
              const decision = await db.decision.upsert({
                where: { id: decData.id },
                update: {
                  question: decData.question,
                  decisionType: decData.decisionType,
                },
                create: {
                  id: decData.id,
                  stageId: stage.id,
                  question: decData.question,
                  decisionType: decData.decisionType,
                }
              });

              if (decData.options && Array.isArray(decData.options)) {
                for (const optData of decData.options) {
                  await db.decisionOption.upsert({
                    where: { id: optData.id },
                    update: {
                      label: optData.label,
                      value: optData.value,
                      rules: optData.rules || null,
                    },
                    create: {
                      id: optData.id,
                      decisionId: decision.id,
                      label: optData.label,
                      value: optData.value,
                      rules: optData.rules || null,
                    }
                  });
                }
              }
            }
          }

          // Sincronizar Documents
          if (stageData.documents && Array.isArray(stageData.documents)) {
            for (const docData of stageData.documents) {
              await db.documentRequirement.upsert({
                where: { id: docData.id },
                update: {
                  name: docData.name,
                  description: docData.description,
                },
                create: {
                  id: docData.id,
                  stageId: stage.id,
                  name: docData.name,
                  description: docData.description,
                }
              });
            }
          }
        }
      }

    } catch (error) {
      console.error(`❌ Erro ao sincronizar a jornada ${file}:`, error);
    }
  }

  console.log("Sincronização concluída.");
}

syncJDL().catch(e => {
  console.error(e);
  process.exit(1);
});
