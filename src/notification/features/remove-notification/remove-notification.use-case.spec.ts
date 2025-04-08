import {AppStore} from "@/src/shared/application/root.store";
import {notificationRemoveStarted} from "@/src/notification/features/remove-notification/remove-notification.events";
import {createTestStore} from "@/src/shared/application/test/test.store";
import {Notification, NotificationType} from "@/src/notification/features/shared/notification.state.model";

describe("As a user I want to remove a notification", () => {
    let testStore: AppStore;
    let notificationIdToDelete: string;
    let notifications: Notification[];

    describe("Given there are notifications in the store", () => {
        beforeAll(() => {
            notifications = [{
                id: "1",
                message: "Notification 1",
                type: NotificationType.SUCCESS
            }, {
                id: "2",
                message: "Notification 2",
                type: NotificationType.ERROR
            },];

            testStore = createTestStore({
                notifications: {
                    list: notifications,
                },
            });

            notificationIdToDelete = notifications[0].id;
        });

        describe("When I remove a notification by its ID", () => {
            beforeEach(() => {
                testStore.dispatch(notificationRemoveStarted(notificationIdToDelete));
            });

            test("Then the notification should be removed from the list", () => {
                const notification = testStore
                    .getState()
                    .notifications.list.find((notification) => notification.id === notificationIdToDelete,);

                expect(notification).toBeUndefined();
            });

            test("Then other notifications should remain in the list", () => {
                const remainingNotification = testStore
                    .getState()
                    .notifications.list.find((notification) => notification.id === notifications[1].id,);

                expect(remainingNotification).not.toBeUndefined();
                expect(remainingNotification?.message).toBe("Notification 2");
            });
        });
    });
});
