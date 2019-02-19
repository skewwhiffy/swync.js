'use strict';

describe('get items handler', () => {
  let userRepo;

  beforeEach(() => {
  });

  it('calls onedrive client to get items', () => {
    /*
     *         dependencies.userRepository.addUser(testData.user)
        val filenames = (0..10).map { TestData.randomString() }
        val files = filenames
            .map { DriveItem(
                testData.onedrive.randomDriveItemId(),
                it,
                FileItem(TestData.randomString()),
                null,
                null,
                testData.onedrive.rootFolder.asParentReference()
            ) }
        val driveItems = listOf(testData.onedrive.rootFolder, *files.toTypedArray())
        val deltaResponse = DeltaResponse(
            null,
            null,
            driveItems
        )
        dependencies.metadata.insert(deltaResponse)

        val result = itemRoutes(listOf())

        assertThat(result.status).isEqualTo(OK)
        val deserializedResponse = GetItemsResponse.lens(result)
        assertThat(deserializedResponse.files.map { it.name }).isEqualTo(filenames)
        */
  });
});
