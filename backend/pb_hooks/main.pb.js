// Хук для автоматического скрытия записей с hidden=true из публичных запросов
// Pocketbase hooks для дополнительной валидации и логики

// Примеры хуков можно добавлять здесь
// См. документацию: https://pocketbase.io/docs/js-overview/

onRecordBeforeCreateRequest((e) => {
  // Можно добавить логику перед созданием записи
}, 'products');

onRecordBeforeUpdateRequest((e) => {
  // Можно добавить логику перед обновлением записи
}, 'products');

